import { Request, Response, NextFunction } from 'express';
import { authenticate } from './sessionAuthenticator';
import mongoose from 'mongoose';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS) || 12;
    const username = req.cookies?.username;
    const sessionId = req.cookies?.sessionId;
  
  // Check if user is authenticated
  if (await authenticate(sessionId, username, expirationTime, mongoose)) {
    return next();
  }

  res.status(401).send('Unauthorized for action!');
}