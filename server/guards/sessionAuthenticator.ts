import { Mongoose } from 'mongoose';
import { Session } from '../class/Session';
export const sessionLogger:any[]= []
export const authenticate = async (sessionId: string, username: string, expirationTime: number, mongoose: Mongoose): Promise<boolean> => {
  if (typeof sessionId == 'string') {
    const session = new Session(null, expirationTime, mongoose, sessionId);
    const actSession = await session.getSession(); // session = call mongodb - get session by sessionId
    const date = new Date()
    const hour = date.getHours()
    sessionLogger.push(hour)
    console.log(hour)
    if (actSession && session.isValid(actSession) && actSession.userName == username) { // make sure that this user is really authorized to change this data
      return true;
    }
  }
  return false;
}