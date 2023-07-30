import React from "react";
import { Routes, Route } from "react-router-dom";
import { PostsProvider } from "./postsContext/PostConext";
import Posts from "./components/Posts";
import GreenLight from "./greenLight/GreenLight";
import TopPosts from "./components/TopPosts";
import CreatePost from "./components/CreatePost";
import CreatePromise from "./promise/CreatePromise";
import Login from "./components/Login";

export default function App() {
  return (
    <>
      <PostsProvider>
        <Routes>
          <Route path="/getPosts" element={<Posts />} />
          {/* <Route path="/topPosts" element={<TopPosts />} /> */}
          <Route path="/upload-post" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </PostsProvider>
      {/* <GreenLight /> */}
      {/* <CreatePromise /> */}
    </>
  );
}
