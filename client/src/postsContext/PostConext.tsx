import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

type postsType = {};
export const postsContext = createContext<postsType[]>([]);

export const PostsProvider = ({ children }: { children: any }) => {
  const [postsData, setPostData] = useState([]);

  async function getDataFromServer() {
    // axios
    //   .get("http://localhost:3031/getPosts")
    //   .then((res) => {
    //     console.log(res)
    //    setPostData(res.data)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    let response = await fetch("http://localhost:3031/getPosts");
    let result = await response.json();
    setPostData(result);
  }
  useEffect(() => {
    getDataFromServer();
  }, []);

  return (
    <postsContext.Provider value={postsData}>{children}</postsContext.Provider>
  );
};
