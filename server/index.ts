import express ,{Request,Response} from "express";
import mongoose from "mongoose";
import multer from "multer";
// import axios from 'axios';
// import cookieParser from "cookie-parser";
import { UserModel } from "./mongoose/userSchema";
import { InstegramPostModel } from "./mongoose/InstegramPostSchema";
import { Session } from "./class/Session";
import connectDB from "./mongoose/connection_mongoDB";
import {authenticate} from "./guards/sessionAuthenticator";

import  { rate5Limiter,rate10Limiter,rate1800Limiter,rate20Limiter,rate30Limiter,rate3600Limiter,rate60Limiter } from './guards/RateLimit';
import { SessionModel } from "./mongoose/SessionSchema";

require("dotenv").config();
const rateLimit = require('express-rate-limit');


const app = express();
const cors = require("cors");
const port = process.env.PORT;
const expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS) || 12;
connectDB();


// app.use(cors());
app.use(cors({ credentials: true, origin: true, maxAge: 2592000, optionSuccessStatus:200 }));

app.use(rate5Limiter,rate10Limiter,rate20Limiter,rate30Limiter,rate60Limiter,rate1800Limiter,rate3600Limiter);
// app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/images",express.static('Images'));




const storage = multer.diskStorage({
  destination: function (req: any, file: Express.Multer.File, callback:(error: Error | null, destination: string) => void) {
    callback(null, "./Images");
  },
  filename: function (req: any, file: Express.Multer.File, callback:(error: Error | null, destination: string) => void) {
    console.log(file);
    callback(null, `${file.originalname}_${Date.now()}`);
  },
});
const upload = multer({ storage });

// client-side query example: POST: 'http://localhost:3000/update-user/3069588493'; body: { address: 'Bugrashov 7, Tel-Aviv, Israel'}
app.post('/update-user/:username', async (req:any, res:any) => {
  const username = req.params.username;
  const { address, email } = req.body;
  const sessionId = req.cookies?.sessionId;

  if (await authenticate(sessionId, username, expirationTime, mongoose)) {
    // save new user data in database - by username
    await UserModel.updateOne({
      userName: username,
    }, { address, email });
    res.status(200).send('User updated successfully!');
  } else {
    res.status(401).send('Unauthorized for action!');
  }
});


app.get('/get-user-profile/:username', async (req:any, res:any) => {
  const username = req.params.username;
  const sessionId = req.cookies?.sessionId;

  if (await authenticate(sessionId, username, expirationTime, mongoose)) {
    const user = await UserModel.findOne({
      userName: username,
    });
    res.json(user);
  } else {
    res.status(401).send('Unauthorized for action!');
  }
});

app.get('/GetGraphData/:username', async (req:Request,res:Response)=>{
  try {
    const sessionId = req.cookies.sessionId;
    const username = req.params.username;

    if (await authenticate(sessionId, username, expirationTime, mongoose)){
      const sessions = await SessionModel.find();
      let numsOfLogin :any = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      const currentDate = new Date();
      sessions.forEach((session) => {
        const createdDate = new Date();
        createdDate.setTime(session?.createdDate as number);
        
        if(createdDate.getDay()===currentDate.getDay() && createdDate.getMonth()===currentDate.getMonth() && createdDate.getFullYear() === currentDate.getFullYear() ){
          numsOfLogin[createdDate.getHours()]++;
        }
      });
      res.status(200).send(numsOfLogin);
    } else {
      res.status(401).send('Unauthorized for action!');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/login',  async (req:any, res:any) => {
  const username = req.body.username;
  const password = req.body.password;

  // Uncomment this if this is your first login - for creating your username in the db
  // const actualUser = new UserModel({
  //   userName: username,
  //   password,
  // });
  // await actualUser.save();

  const user = await UserModel.findOne({
    userName: username,
    password,
  });

  if (!user) {
    res.status(401).send('Bad username & password combination');
  } else {

 

    const session = new Session(username, expirationTime, mongoose);
    // this class saves the session in mongo behind the scenes - in Session constructor
    const sessionId = await session.getSessionId();
    res.cookie('sessionId', sessionId, { maxAge: expirationTime * 60 * 60000, httpOnly: true, sameSite: 'none', secure: true });
    res.status(200).send('Login succesfully!');
  }
});


//client-side query example: POST: 'http://localhost:3000/upload-post'; body: { postname, description, userName, data, image }

app.post("/upload-post", upload.single("image"), async (req, res) => {
  try {
    const image = req.file;
    const { postName, description, userName, date } = req.body;
    console.log(image?.filename, postName, description, userName, date);

    const newPost = new InstegramPostModel({
      postName: postName,
      description: description,
      userName: userName,
      date: date,
      image: image?.filename,
    });
    await newPost.save();
    console.log(newPost);
    res.status(201);
  } catch {
    res.status(501);
  }
});


app.get('/Check',(req:Request,res:Response)=>{
  res.send('good check');
})

app.get("/getPosts/:username", async (req, res) => {
  const username = req.params.username;
  const sessionId = req.cookies?.sessionId;
  try {
    if (await authenticate(sessionId, username, expirationTime, mongoose)) {
      // let response = await axios.get("https://randomuser.me/api/?results=3");
      // let data: any = response.data;
      const newPosts = await InstegramPostModel.find();
  
      // return res.send(data.results.concat(newPosts));
    } else {
      res.status(401).send('Unauthorized for action!');
    }
  } catch(error) {
    console.log(error);
    // res.render("server-error");
  }
});

app.use("*", (req, res) => {
  res.render("not-found");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
