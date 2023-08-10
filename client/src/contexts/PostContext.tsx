import React, { useState, useEffect, createContext } from "react";
//import axios from "axios";

type postsType = {};
export const postsContext = createContext<postsType[]>([]);

export const PostsProvider = ({ children }: { children: any }) => {
  const [postsData, setPostData] = useState([]);
  
  return (
    <postsContext.Provider value={[postsData,setPostData]}>{children}</postsContext.Provider>
  );
};
