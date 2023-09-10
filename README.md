# FullStack-INT-Aug-22

Installation steps:
### client:
1) `cd client`, then - `npm i`
2) run `npm start`
### server: 
1) `cd server`, then - `npm i`
2) if you run mongo in Atlas - update MONGO_URI in your .env file 
3) if you run mongo locally - do "To run mongo locally" steps
4) make sure you generated your two keys:
- run node
- require('crypto').randomBytes(64).toString('hex') -> save it in ACCESS_TOKEN_SECRET
- run again require('crypto').randomBytes(64).toString('hex') -> save it in REFRESH_TOKEN_SECRET
4) run `npm start`

# To run mongo locally:
1) Install Docker software from here - https://docs.docker.com/get-docker/
2) Run Docker software on your computer
3) in terminal run - `docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server:latest`
4) Update in .env file - MONGO_URI=mongodb://localhost:27017
- (To kill the mongo - run `docker ps`, then copy the id under the CONTAINER_ID, then run `docker kill <THE-ID-YOU-COPIED>`)

# To run redis locally:
1) Install Docker software from here - https://docs.docker.com/get-docker/
1.1) Install redis on windows: https://redis.io/docs/getting-started/installation/install-redis-on-windows/
1.2) [If mac] - Install redis on mac: https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/
2) run `docker run -p 6379:6379 --env ALLOW_EMPTY_PASSWORD=yes -it redis/redis-stack-server:latest`

[If you did steps 1.1 / 1.2 - you can check if your redis is running locally well by writing 'redis-cli' in the terminal and running some redis command (like `SETEX check1 43000 "check1value"`) ]