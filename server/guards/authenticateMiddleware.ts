import { Request, Response, NextFunction } from 'express';
import { authenticate } from './sessionAuthenticator';
import mongoose from 'mongoose';

require('dotenv').config();

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const sessionId = req.cookies?.sessionId;
    const expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS) || 12;
    const username = req.params.username;
  // Check if user is authenticated
  if (await authenticate(sessionId,username,expirationTime,mongoose)) {
    return next();
  }
  res.status(401).send('unauthorizesd');
}