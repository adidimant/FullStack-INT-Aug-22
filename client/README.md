# H.W 21/06/23:
1) Instagram app:
1.1) create Instegram-post with react app
1.2) set an array of objects for posts ({title,text,authorName, bonus - image (with urls)}), and render a list of posts in the blog.
the posts should be 3 in 1 row
1.3) Present an example how to use useEffect to fetch for this object array from another server.
(hint: use array.map to iterate and build the components)
2) Build another component for the project, add 3 props from outside to the component and define a type for those props
  2.1) Read about setInterval - https://www.w3schools.com/jsref/met_win_setinterval.asp
  Inside the component - use the interval for updating once in a minute the state (using useState) called "greenLight" to true - this flag is a boolean "green light" that should be turned-off (false) after 1 second
  2.2) Create a function that calculates the remaining seconds for the day (until 00:00 today), use the hook useMemo to calculate this only when the flag "greenLight" is true!
  2.3) Present the remaining seconds for the day in the return() from the component.
3) Read about useContext, useRef, useCallback - explain in class their usage.



# H.W 25/06:
 React context API is being used mostly to store/share data between components, and avoid the props providing every time
See example from class: https://www.w3schools.com/react/react_usecontext.asp
1) Use the React Context API in your instagram app to store the posts data
1.1) Create another instagram page, that presents the TOP 3 posts according to their date (latest posts - add dates for each post if needed), use the useContext to retrieve the data from the context
2) Use useRef hook in order to interact with a dom element - create an event listener on a button in the new page you create, the button is "Create a post"
on clicking the button - perform redirect to the first page.
3) In our previous HWs we defined callback funcs that return function according to an input.
    Use React useCallBack hook for this same case to use the same callback and not re-render this - only if the provided value changed.
4) Read about JS promises here -
https://www.w3schools.com/js/js_promise.asp
more info - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

4.1) what can be all the Promise statuses?
pending: initial state, neither fulfilled nor rejected.
fulfilled: meaning that the operation was completed successfully.
rejected: meaning that the operation failed.

4.2) How do we declare and initialize a promise?
let promise = new Promise(function(resolve, reject) {    
    // Make an asynchronous call and either resolve or reject
});

4.3) what are the params the promise expect to recieve?
resolve,reject

4.4) After we declare the Promise - is the promise executed? or it is waiting for something?

 4.5) What are the methods the Promise class expose in a promise instance? are they public/protected/private methods?

The methods Promise.prototype.then(), Promise.prototype.catch(), and Promise.prototype.finally() are used to associate further action with a promise that becomes settled. As these methods return promises, they can be chained.

4.6) Are there any static methods the Promise class expose?
 1) Read about the static function:
 Promise.all, Promise.any, Promise.race, Promise.resolve, Promise.reject




