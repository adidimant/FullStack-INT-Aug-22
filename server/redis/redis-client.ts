import { createClient, RedisClientType } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

let setConnected: (_?: any) => void;

const connectionPromise = new Promise(res => {
  setConnected = res;
});

async function connect() {
  await client.connect();
  setConnected();
}

connect();

export async function getClient(): Promise<any> {
  await connectionPromise;
  return client;
}

/*
different ways to set / get the user tokens from redis:
option 1
await redisClient.setEx(`tokens-${username}`, (process.env.REDIS_EXPIRATION_IN_SECONDS as number | any), tokensObjStr);
const userTokensStr: string | null = await redisClient.get(`tokens-${username}`);
try {
  const userTokens = JSON.parse(userTokensStr as string);
} catch(err) {
  console.log('error in parsing: ' + err);
}
option 2:
await redisClient.hSet(`users-tokens`,username, tokensObjStr);
const userTokensStr2: string | undefined = await redisClient.hGet('users-tokens', username);
if(userTokensStr2) {
  const userTokens2 = JSON.parse(userTokensStr2);
}

how the redis will look "behind the scenes":

Redis: {
 'users-tokens': {
   '3068897865': "{ accessToken: asdkhjb34fijh3nr, refreshToken: 324rhjfbrds }"
 }
}

option 3:
await redisClient.hSet(`users-access-tokens`,username, accessToken);
await redisClient.hSet(`users-refresh-tokens`,username, refreshToken);
*/
