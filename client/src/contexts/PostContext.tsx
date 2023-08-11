import React, {
  useState,
  useEffect,
  createContext,
  useLayoutEffect,
} from "react";
import axios from "axios";
import { useAuthContext } from "./authProvider";
import axiosClient from "../apiClient";

export const postsContext = createContext<any>([]);

export const PostsProvider = ({ children }: { children: any }) => {
  const [postsData, setPostData] = useState([]);
  const Auth = useAuthContext();
  console.log("in Context:" + postsData);

  async function getDataFromServer() {
    //get the posts from the server
    const response = await axiosClient.get(
      `http://localhost:3031/getPosts/${Auth.userName}`,
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
  }, [Auth.isLoggedIn]);//layout effect to get the data after logged in

  return (
    <postsContext.Provider value={[postsData, setPostData]}>
      {children}
    </postsContext.Provider>
  );
};
