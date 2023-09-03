import express, { Request, Response, json } from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import multer from "multer";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import { UserModel } from "./mongoose/userSchema";
import { InstegramPostModel } from "./mongoose/InstegramPostSchema";
import { Session } from "./class/Session";
import connectDB from "./mongoose/connection_mongoDB";
import { rate5Limiter, rate10Limiter, rate1800Limiter, rate20Limiter, rate30Limiter, rate3600Limiter, rate60Limiter } from './guards/RateLimit';
import { SessionModel } from "./mongoose/SessionSchema";
import { getUsernameByReq, authMiddleware } from "./guards/Authenticate";
import { getClient } from "./redis/redis-client";
import { RedisClientType } from "redis";

let redisClient: RedisClientType;
getClient().then((client: RedisClientType) => {
  redisClient = client;
}).catch((err) => console.error(err));

const SUPPORTED_AUTHENTICATION_MGMT_METHODS = ['token', 'session'];

require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS) || 1;

// Validating AUTHENTICATION_MGMT_METHOD env variable to ensure it's defined & one of the supported methods
if (!SUPPORTED_AUTHENTICATION_MGMT_METHODS.includes(process.env.AUTHENTICATION_MGMT_METHOD || '')) {
  throw new Error('critical env variable AUTHENTICATION_MGMT_METHOD is missing!');
}

connectDB();

app.use(cors({ credentials: true, origin: true, maxAge: 2592000, optionSuccessStatus: 200 }));
app.use(express.json());
app.use(rate5Limiter, rate10Limiter, rate20Limiter, rate30Limiter, rate60Limiter, rate1800Limiter, rate3600Limiter);
app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/images", express.static('Images'));

const unless = function(pathsToIgnoreMiddleware: string[], middleware:any) {
  return function(req:any, res:any, next:any) {
      if (pathsToIgnoreMiddleware.includes(req.path)) {
          return next();
      } else {
          return middleware(req, res, next);
      }
  };
};
app.use(unless(['/login', '/token'], authMiddleware));

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

app.put("/register", async (req: any, res: any) => {
  const saltRounds = 10;
  try{
  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const actualUser = new UserModel({
    email,
    password: hashedPassword,
  });
  await actualUser.save();
    res.status(200).send("register succesfully!");
  } catch {
    res.status(409).send("The user exists, Enter with another email");
  }
});


app.post('/login', async (req: any, res: any) => {
  const username = req.body.username;
  let password = req.body.password;

  // Uncomment this if this is your first login - for creating your username in the db
  // FIRST ANSWER -REGISTRARION:

  // const saltRounds = 10;
  // const hashedPassword = await bcrypt.hash(password, saltRounds);

  // const actualUser = new UserModel({
  //   userName: username,
  //   password: hashedPassword,
  // });
  // await actualUser.save();

  const user = await UserModel.findOne({
    userName: username,
  });
  if (!user) {
    return res.status(401).send('Bad username & password combination');
  } else if (!user.password) {
    return res.status(500).send("User password is missing");
  }

  const match = await bcrypt.compare(password, user?.password as string);

  if (!match) {
    return res.status(401).send('Bad username & password combination');
  } else {
    if (process.env.AUTHENTICATION_MGMT_METHOD == 'token') {
      const payload = { name: username };

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: `${expirationTime}h` });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || '');
      const tokensObjStr = JSON.stringify({ accessToken, refreshToken });
      await redisClient.setEx(`tokens-${username}`, (process.env.REDIS_EXPIRATION_IN_SECONDS as number | any), tokensObjStr);

      res.status(200).json({ accessToken, refreshToken });
    } else { // process.env.AUTHENTICATION_MGMT_METHOD == 'session'
      const session = new Session(username, expirationTime, mongoose); // NOTE: Why create new session if session exists in DB??
      // this class saves the session in mongo behind the scenes - in Session constructor
      const sessionId = await session.getSessionId();
      res.cookie('sessionId', sessionId, { maxAge: expirationTime * 60 * 60000, httpOnly: true });
      res.cookie('username', username, { maxAge: expirationTime * 60 * 60000, httpOnly: true });
      res.status(200).send('Login succesfully!');
    }
  }
});

app.post('/token', async (req: any, res) => {
  if (process.env.AUTHENTICATION_MGMT_METHOD == 'token') {
    const refreshToken = req.body?.refreshToken;
    if (refreshToken) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '', async (err: any, payload: any) => {
        if (!err) {
          const username = payload.name;
          const TokensinString = await (redisClient as RedisClientType).get(`tokens-${username}`);
          const userTokens = JSON.parse(TokensinString as string);

          if (userTokens?.refreshToken == refreshToken) {
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: `${expirationTime}h` });
            const TokensObj = {accessToken,refreshToken};
            await (redisClient as RedisClientType).setEx(`tokens-${username}`,(process.env.REDIS_EXPIRATION_IN_SECONDS as number | any), JSON.stringify(TokensObj));
            return res.status(200).json({ accessToken });
          }
        }
      });
    }
  }
  return res.status(401).send('Unauthorized for this action!');
});

app.post('/logout', async (req: any, res) => {
  if (process.env.AUTHENTICATION_MGMT_METHOD == 'token') {
    const username = req?.user?.name;
    await (redisClient as RedisClientType).DEL(`tokens-${username}`);
  } else {
    const sessionId = req.cookies?.sessionId;
    const session = new Session(null, expirationTime, mongoose, sessionId);
    const actSession = await session.getSession();
    await session.deactivateSession(actSession);
  }
  return res.send('200');
});

//ROUTES--------------------------------------------------

app.get("/getPosts", async (req, res) => {
  try {
    // Note - if you do want to use the username in this endpoint - extract it from getUsernameByReq(req);
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
  const username = getUsernameByReq(req);

  // save new user data in database - by username
  await UserModel.updateOne({
    userName: username,
  }, { address, email });

  res.status(200).send('User updated successfully!');
});


app.get('/get-user-profile/:username', async (req: any, res: any) => {
  const username = getUsernameByReq(req);

  const user = await UserModel.findOne({
    userName: username,
  });
  res.json(user);
});
app.get('/UsersOverview',  async (req: any, res: Response) => {
  const username = getUsernameByReq(req);
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
  const username = getUsernameByReq(req);
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

app.post("/upload-post", upload.single("image"), async (req: any, res) => {
  try {
    const image = req.file;
    const username = getUsernameByReq(req);
    const { postName, description, date } = req.body;
    console.log(image?.filename, postName, description, username, date);

    const newPost = new InstegramPostModel({
      postName: postName,
      description: description,
      userName: username,
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
