import React, { useState, useEffect, createContext, useLayoutEffect } from "react";
import axios from "axios";
import axiosClient from "../apiClient";
import { useAuthContext } from "./authProvider";

type postsType = {};
export const postsContext = createContext<postsType[]>([]);

export const PostsProvider = ({ children }: { children: any }) => {
  const [postsData, setPostData] = useState([]);
  const Auth = useAuthContext();

  async function getDataFromServer() {
    //get the posts from the server
    const response = await axiosClient.get(
      `http://localhost:3031/getPosts/`,
      {
        method: "GET",
        withCredentials: true,
      }
    );

    const result = response?.data;
    //adding the posts to the context
    if (result) {
      setPostData(result);//setting the state
      console.log(postsData);
    }
  }

  useLayoutEffect(() => {
    if (Auth.isLoggedIn) {
      getDataFromServer();
    }
  }, [Auth.isLoggedIn]);
  return (
    <postsContext.Provider value={[postsData, setPostData]}>{children}</postsContext.Provider>
  );
};
