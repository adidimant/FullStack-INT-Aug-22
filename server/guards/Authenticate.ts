import { Request, Response, NextFunction } from 'express';
import { sessionAuthenticate } from './sessionAuthenticator';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import {redisClient} from '../index';
import { RedisClientType } from '@redis/client';
export const VALID_TOKENS: { [key: string] : string } = {};
export const REFRESH_TOKENS: { [key: string] : string } = {};

export const getUsernameByReq = (req: Request & { user: { name: string }}) => {
  if (process.env.AUTHENTICATION_MGMT_METHOD == 'token') {
    return req?.user?.name;
  } else { // sessions authentication management
    return req?.cookies?.username;
  }
};

export async function authMiddleware(req: Request & { user: any }, res: Response, next: NextFunction) {
  let passedAuthorization = false;
  if (process.env.AUTHENTICATION_MGMT_METHOD == 'token') {
    const authorizationHeader = req.headers.authorization; // 'Bearer <TOKEN>'
    const accessToken = authorizationHeader?.split(' ')[1] || '';
    
    jwt.verify(accessToken || '', process.env.ACCESS_TOKEN_SECRET || '', async (err, payload: any) => {
      const TokensinString = await (redisClient as RedisClientType).get(`tokens-${payload?.name}`);
      const userTokens = JSON.parse(TokensinString as string);
      if (!err && userTokens.accessToken === accessToken) {
        req.user = payload;
        passedAuthorization = true;
        next();
      }
    });

  } else { // process.env.AUTHENTICATION_MGMT_METHOD == 'session'
    const expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS) || 12;
    const username = req.cookies?.username;
    const sessionId = req.cookies?.sessionId;
    
    // Check if user is authenticated
    if (await sessionAuthenticate(sessionId, username, expirationTime, mongoose)) {
      passedAuthorization = true;
      next();
    }
  }
  if (!passedAuthorization) {
    return res.status(401).send('Unauthorized for action!');
  }
}