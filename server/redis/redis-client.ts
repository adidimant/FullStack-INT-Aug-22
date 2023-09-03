import { createClient, RedisClientType } from 'redis';

const client = createClient({
  url: 'redis://localhost:6379',
});

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