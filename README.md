# FullStack-INT-Aug-22

Installation steps:
### client:
1) `cd client`, then - `npm i`
2) run `npm start`
### server: 
1) `cd server`, then - `npm i`
2) if you run mongo in Atlas - update MONGO_URI in your .env file 
3) if you run mongo locally - do "To run mongo locally" steps
4) run `npm start`

# To run mongo locally:
1) Install Docker software from here - https://docs.docker.com/get-docker/
2) Run Docker software on your computer
3) in terminal run - `docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server:latest`
4) Update in .env file - MONGO_URI=mongodb://localhost:27017
- (To kill the mongo - run `docker ps`, then copy the id under the CONTAINER_ID, then run `docker kill <THE-ID-YOU-COPIED>`)