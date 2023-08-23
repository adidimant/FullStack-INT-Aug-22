import { Request, Response, NextFunction } from 'express';
import { sessionAuthenticate } from './sessionAuthenticator';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

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
  if (process.env.AUTHENTICATION_MGMT_METHOD == 'token') {
    const authorizationHeader = req.headers.authorization; // 'Bearer <TOKEN>'
    const accessToken = authorizationHeader?.split(' ')[1] || '';
    if (accessToken == '') {
      return res.status(401).send('Unauthorized for action!');
    }
    jwt.verify(accessToken || '', process.env.ACCESS_TOKEN_SECRET || '', (err, payload: any) => {
      if (err) {
        return res.status(401).send('Unauthorized for action!');
      } else if (VALID_TOKENS[payload?.name] != accessToken) {
        return res.status(401).send('Unauthorized for action!');
      }
      req.user = payload;
      return next();
    });

  } else { // process.env.AUTHENTICATION_MGMT_METHOD == 'session'
    const expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS) || 12;
    const username = req.cookies?.username;
    const sessionId = req.cookies?.sessionId;
    
    // Check if user is authenticated
    if (await sessionAuthenticate(sessionId, username, expirationTime, mongoose)) {
      return next();
    }
  }

  return res.status(401).send('Unauthorized for action!');
}