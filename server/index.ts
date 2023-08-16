import express, { Request, Response } from "express";
import mongoose from "mongoose";
import multer from "multer";
import axios from 'axios';
import cookieParser from "cookie-parser";
import { UserModel } from "./mongoose/userSchema";
import { InstegramPostModel } from "./mongoose/InstegramPostSchema";
import { Session } from "./class/Session";
import connectDB from "./mongoose/connection_mongoDB";
import { rate5Limiter, rate10Limiter, rate1800Limiter, rate20Limiter, rate30Limiter, rate3600Limiter, rate60Limiter } from './guards/RateLimit';
import { SessionModel } from "./mongoose/SessionSchema";
import { authMiddleware } from "./guards/Authenticate";

require("dotenv").config();

const app = express();
const cors = require("cors");
const port = process.env.PORT;
const expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS) || 1/60;
connectDB();

app.use(cors({ credentials: true, origin: true, maxAge: 2592000, optionSuccessStatus: 200 }));
app.use(express.json());
app.use(rate5Limiter, rate10Limiter, rate20Limiter, rate30Limiter, rate60Limiter, rate1800Limiter, rate3600Limiter);
app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/images", express.static('Images'));

const unless = function(path:any, middleware:any) {
  return function(req:any, res:any, next:any) {
      if (path === req.path) {
          return next();
      } else {
          return middleware(req, res, next);
      }
  };
};
app.use(unless('/login', authMiddleware));

const storage = multer.diskStorage({
  destination: function (req: any, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
    callback(null, "./Images");
  },
  filename: function (req: any, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
    // console.log(file);
    callback(null, `${file.originalname}_${Date.now()}`);
  },
});
const upload = multer({ storage });

app.post('/login', async (req: any, res: any) => {
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
    //NOTE: Why create new session if session exists in DB??

    const session = new Session(username, expirationTime, mongoose);
    // this class saves the session in mongo behind the scenes - in Session constructor
    const sessionId = await session.getSessionId();
    res.cookie('sessionId', sessionId, { maxAge: expirationTime * 60 * 60000, httpOnly: true });
    res.cookie('username', username, { maxAge: expirationTime * 60 * 60000, httpOnly: true });
    res.status(200).send('Login succesfully!');
  }
});

app.post('/logout', async (req, res) => {
  const sessionId = req.cookies?.sessionId;
  const session = new Session(null, expirationTime, mongoose, sessionId);
  const actSession = await session.getSession();
  await session.deactivateSession(actSession);
  return res.send('200');
});

//ROUTES--------------------------------------------------

app.get("/getPosts", async (req, res) => {
  try {
    let response = await axios.get("https://randomuser.me/api/?results=3");
    let data: any = response.data;
    const newPosts = await InstegramPostModel.find();

    return res.send(data.results.concat(newPosts));
  } catch (error) {
    console.log(error);
    res.render("server-error");
  }
});

// client-side query example: POST: 'http://localhost:3000/update-user/3069588493'; body: { address: 'Bugrashov 7, Tel-Aviv, Israel'}
app.post('/update-user', async (req: any, res: any) => {
  const { address, email } = req.body;
  const username = req.params.username

  // save new user data in database - by username
  await UserModel.updateOne({
    userName: username,
  }, { address, email });

  res.status(200).send('User updated successfully!');
});


app.get('/get-user-profile/:username', async (req: any, res: any) => {
  const username = req.cookies?.username;

  const user = await UserModel.findOne({
    userName: username,
  });
  res.json(user);
});

app.get('/UsersOverview',  async (req: Request, res: Response) => {
  const username = req.cookies?.username
  try {
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
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/UserOverview", async (req: any, res: any) => {
  const username = req.cookies?.username
  try{
    const sessionUser = await SessionModel.find({userName:username});
    let numsOfLogin: any = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    const currentDate = new Date();
    sessionUser.forEach((session) => {
      const createdDate = new Date();
      createdDate.setTime(session?.createdDate as number);
  
      if (
        createdDate.getDay() === currentDate.getDay() &&
        createdDate.getMonth() === currentDate.getMonth() &&
        createdDate.getFullYear() === currentDate.getFullYear()
      ) {
        numsOfLogin[createdDate.getHours()]++;
      }
    });
    res.status(200).send({numsOfLogin, username});
  } catch (error) {
  res.status(500).send(error);
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


app.get('/Check', (req: Request, res: Response) => {
  res.send('good check');
})

app.use("*", (req, res) => {
  res.render("not-found");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
