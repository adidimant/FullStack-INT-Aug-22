import React from "react";
import { Routes, Route } from "react-router-dom";
/* set PUBLIC_URL=login&&*/

import { PostsProvider } from "./postsContext/PostConext";
import Posts from "./components/Posts";
import GreenLight from "./greenLight/GreenLight";
import TopPosts from "./components/TopPosts";
import CreatePost from "./components/CreatePost";
import CreatePromise from "./promise/CreatePromise";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";



export default function App() {
  return (
    <>
      <PostsProvider>
        <Routes>
          <Route path="/getPosts" element={<Posts />} />
          {/* <Route path="/topPosts" element={<TopPosts />} /> */}
          <Route path="/upload-post" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </PostsProvider>
      {/* <GreenLight /> */}
      {/* <CreatePromise /> */}
    </>
  );
}
