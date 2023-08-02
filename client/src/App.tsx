import { Routes, Route } from "react-router-dom";
import { PostsProvider } from "./postsContext/PostConext";
import Posts from "./components/Posts";
import TopPosts from "./components/TopPosts";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";



export default function App() {
  return (
    <>
      <PostsProvider>
        <Routes>
          <Route path="/getPosts" element={<Posts />} />
          <Route path="/topPosts" element={<TopPosts />} />
          <Route path="/upload-post" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </PostsProvider>
    </>
  );
}
