import { SessionModel } from "../mongoose/SessionSchema";
import { Mongoose } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export class Session {
  userName: string| null;
  sessionId?: string;
  expirationTime: number;
  mongoose: Mongoose;
  private initPromise: Promise<boolean> | undefined;
  private setInitPromise: ((successFlag: boolean) => void) | undefined;
  constructor(
    userName: string|null,
    expirationTime: number,
    mongoose: Mongoose,
    sessionId?: string
  ) {
    this.userName = userName;
    this.expirationTime = expirationTime;
    this.mongoose = mongoose;

    this.initPromise = new Promise((res, rej) => {
      this.setInitPromise = res;
    });

    this.initSession(sessionId);
  }

  private  initSession(sessionId?: string): Promise<void> {
    return new Promise((res, rej)=>{
      if (!sessionId) {
        const myuuid = uuidv4();
        const session = new SessionModel({
          id: myuuid,
          userName: this.userName,
          createdDate: Date.now(),
        });
        session.save();
        return this.sessionId = myuuid;
        res()
      } else {
        this.sessionId = sessionId;
       rej()
      }
    })
    
  }
  
  public async getSession() {
    return await SessionModel.findOne({ id: this.sessionId });
  }

  public isValid(session: any): boolean {
    const currentTime = Date.now();
    const liveSession = currentTime - session.createdDate;
    const liveSessionHours = liveSession / (60 * 60 * 1000);
    if (this.expirationTime > liveSessionHours) {
      console.log("valid");
      return true;
    } else {
      console.log("expirationTime");
      return false;
    }
  }

  getUserName() {
    return this.userName;
  }
  async getSessionId() {
    if (await this.initPromise) {
      return this.sessionId;
    }
    return null;
  }

  getExpirationTime() {
    return this.expirationTime;
  }
  setUserName(userName: string) {
    this.userName = userName;
  }
  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }
  setExpirationTime(expirationTime: number) {
     this.expirationTime = expirationTime;
  }
}
