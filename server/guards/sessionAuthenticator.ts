import { Mongoose } from 'mongoose';
import { Session } from '../class/Session';

export const authenticate = async (sessionId: string, username: string, expirationTime: number, mongoose: Mongoose): Promise<boolean> => {
  if (typeof sessionId == 'string') {
    const session = new Session(null, expirationTime, mongoose, sessionId);
    const actSession = await session.getSession(); // session = call mongodb - get session by sessionId
    if (actSession && session.isValid(actSession) && actSession.userName == username && actSession.isActive) { // make sure that this user is really authorized to change this data
      return true;
    }
  }
  return false;
};
