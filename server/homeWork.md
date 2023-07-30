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


SQL databases are primarily called Relational Databases (RDBMS); whereas NoSQL databases are primarily called non-relational or distributed databases. 

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