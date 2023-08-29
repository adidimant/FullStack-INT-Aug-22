import mongoose from "mongoose";
import { Session } from "../class/Session";

export const sessionAuthenticate = async (sessionId: string, username: string, expirationTime: number, mongoose: Mongoose): Promise<boolean> => {
  if (typeof sessionId == 'string') {
    const session = new Session(null, expirationTime, mongoose, sessionId);
    const actSession = await session.getSession();
    res.send('actSession')
    if (
      actSession &&
      session.isValid(actSession) &&
      actSession.userName == username
    ) {
      console.log('true')
    const actSession = await session.getSession(); // session = call mongodb - get session by sessionId
    if (actSession && session.isValid(actSession) && actSession.userName == username && actSession.isActive) { // make sure that this user is really authorized to change this data

      return true;
    } 
  }

  else {
    console.log('status:401')
    res.status(401).send("Unauthorization");
  }
  next();

  return false;

}}
