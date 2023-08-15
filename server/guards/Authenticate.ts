import { authenticate } from "./sessionAuthenticator";
import express ,{Request,Response,NextFunction} from "express";
const expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS) || 12;
import mongoose from "mongoose";



// need to make a function that will check and handle 401 - if authenticate ? access : denied-move to the main page
 const authenticateMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    const username = req.params.username;
    const sessionId = req.cookies?.sessionId;
    try {
            
      if (await authenticate(sessionId, username, expirationTime, mongoose)) {
        // If authentication succeeds, move to the next middleware or route handler
        console.log('Authentication successful for', username);
        return  next();
      } else {
        res.status(401).send('Unauthorized for action!');
        //move to the login page --
        console.log('Authentication failed for', username);

      }
    } catch(error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  };
  
  export default authenticateMiddleware;
//    app.addAsync(authenticate(Session, username, expirationTime, mongoose));
