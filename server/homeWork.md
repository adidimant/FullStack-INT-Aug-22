# H.W 28/06:
1) implement a function called makeQuarablePromise that recieves a Promise and returned the promise + a new field with the status of the promise!
the status can be - 'fullfilled' || 'rejected' || 'pending'
(note for typescript usage)
2) solve the problem from leetcode: https://leetcode.com/problems/maximum-subarray/


# H.W 02/07/2023:
1) Read about the static function: Promise.all, Promise.any, Promise.race, Promise.resolve, Promise.reject
the Promise class exposes - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
come with explanation to class and a usage example for each of the use-cases
2) Establish a basic server in node.js, the server should fetch for random people's api: https://randomuser.me/api/?results=20
your api should be called /getPosts , and the backend should execute the request/filtering, etc.
the result should be returned to your react app (instagram app) and present the results accordingly in website
Note that the server is running locally, so the react application queries to http://localhost
the server should run on port 3031


# H.W 09/07/23:
1) Implement your own ideas for 3 different async functions and 2 different promises (one of the promises should be Promise.resolve())
show an example of calling Promise.all, Promise.race and Promise.any about those promises and explain the results of your code.
2) regarding H.W 02/07/2023 - upgrade your server to TS, and make sure your instagram is working with this server.


# H.W 12/07:
1) Read about all http main status codes, provide an explanation for the following family codes: 2xx, 3xx, 4xx, 5xx.
2) Create 3 different views for (1) 4xx case, (2) 5xx case, (3) Your special view - presenting some image, text, and button that onclick - present another thing.
3) Present an example of connecting your express server using mongoose library and mongodb database. 

# H.W 16/07/23:
1) Create the SessionXXX class, the class should:
- recieve: a username, sessionId (transfer null if you want to create a new session), expiration time [number] (how long in hours the session should be valid)
- contains a public method isValid() - the function should calculate if the session expired
- getUsername(), getSessionId() public method (generally getters & setters)
- The SessionXXX class - should create in the constructor an session object if not exist
2) Create two schemas & models for Session & User in mongodb
3) Complete the server code we did in class, in partifular:
- All the calls for mongo - get user, update user, create session, get session
- The SessionXXX class usage.
- all the validations we did
- error handling
- generic structure of 404 & 500 views / responses


# H.W 19/07:
1) Complete the in mongo interaction with get user (in /login route) & update user (in /update-user/:id route) - similarly to what we did in Session class
2) Add a new schema for instagram post
3) Create an ability in the html to create a post - that fills a form (post name, description, username, date, image - you should find out in the internet how to upload image to express server) - you should implement a new /upload-post route in the server that saves the post in the mongo db, and saves the image. the new post should be added to the previous list.
4) Create a simple login page to your instagram app - contains - logo at the top, fields: username, password


# H.W 23/07:
- Read about sql vs no-sql databases:
* Give a list of 10 databases - and split them to categories (who is sql and who is no-sql)
* Explain what is special about each database
* Explain at least 4 advantages for each sql/nosql database.


# H.W 02/08:
1) [Bonus for the serious engineers] - try to solve the asynchronous bug in the Session class - causing this.sessionId being undefined before initSession finished - the solution should be that getSessionId method should await some promise to be resolved.
2) Implement express middlewear for rate-limiting by IP and by username (put the middlewear under the 'guards' folder and import from there)
it means you should track after requests from the same IPs and the same username over time windows.
The relevant time windows (left side is seconds right side is request amount):
{ 5: 5, 10: 8, 20: 12, 30: 15, 60: 20, 1800: 150, 3600: 300 }
example - if a request from the same IP reached over 5 requests per 5 seconds - block the request by returning the proper 4xx status code (search for it) with a response message ('Too many requests!').
- If you have any leftovers from the non-working application (react or server or mongo-atlas or git) - fix it!
- open pull-request to the main branch with your homework

# H.W 06/08:
1) [Bonus] - Solve the issue that the browser isn't set cookie on the next requests to the backend.
2) Watch this video about JWT authentication in express.js servers: https://www.youtube.com/watch?v=mbsmsi7l3r4 - fully understand it.
3) Find a UI library that presents graphs, create a new page called 'Overview' page, that displays 1 graph - logins over time.
the graph should present only the last 24h, with maximum 25 bars (for example: { 00:00: 20, 01:00: 15, 02:00: 2, .... } )
The endpoints should be authenticated via our authentication guard.

# H.W 09/08:
1) Move `authenticate` function in every data endpoint (route) to an official middleware, use this middleware on every data endpoint we expose
- Note - the middleware should handle the 401 authorization response in case the user isn't authorized! and not from the route
2) Implement Logout button (should be displayed in every page in a top layout component above all pages), pressing the button logs the user out, ends the user session in the database (just marking the session as not logged in but not removing it)
3) Emanuel & Ori - fix the useContext data of the posts in the TopPosts page
4) Add username to AuthContext, and use it in the call getPosts to backend - to specify generic username (adapt in module Posts.tsx line 27)
5) Esti - add your recharts graph implementation to our overview page, your graph should be logins per this specific logged-in user, organize the page - smaller graphs, also the graphs should be in the middle.
6) If you didn't watch - watch this video about JWT authentication in express.js servers: https://www.youtube.com/watch?v=mbsmsi7l3r4.
Link to recharts graphs for learning: https://recharts.org/en-US/examples/PercentAreaChart

# H.W 09/08:
- Emanual & Ori - perform `git pull` then `git merge origin/main` to your branch, remove your work on the logout - update only your work on the TopPosts & postsContext to be effected.
- Esti - open your PR - only for the graph updates.
- Progress on your final project
- Go over our repository, try to explain to yourself & your teammate what is going on there.

SQL databases are primarily called Relational Databases (RDBMS); whereas NoSQL databases are primarily called non-relational or distributed databases. 

# H.W 27/08:
- Implement password encryption & password comparing when the user is logged in
Read about it from here: https://www.npmjs.com/package/bcrypt
The implementation should be full (mostly on the server side)

# H.W 30/08:
- Go over again the redis-client.ts file implementation - you should know very well what we did with the promise & what is the redis library doing behind the scene.
- Implement cache in redis, that stores the VALID_TOKENS & REFRESH_TOKENS in redis (instead of saving this in the service memory)
- You should use HSET function, define the proper table.
- Suggest other redis functions altervatives for that solution.

<!-- sql: -->
mysql,
MariaDB,
Oracle,
Microsoft SQL Server
PostgreSQL,
BM DB2,
SQLite
 <!-- NoSQL -->
 MongoDB,
 Redis
OrientDB
GraphQL,
Cassandra


sql / no sql
RELATIONAL DATABASE MANAGEMENT SYSTEM (RDBMS) /	Non-relational or distributed database system.
These databases have fixed or static or predefined schema /	They have a dynamic schema
These databases are not suited for hierarchical data storage. /	These databases are best suited for hierarchical data storage.
These databases are best suited for complex queries / These databases are not so good for complex queries
Vertically Scalable / Horizontally scalable
Follows ACID property / Follows CAP(consistency, availability, partition tolerance)
