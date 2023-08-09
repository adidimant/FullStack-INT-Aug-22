import { Routes, Route } from "react-router-dom";
import { PostsProvider } from "./context/PostContext"
import  AuthProvider  from "./context/authProvider"
import Posts from "./components/Posts";
import TopPosts from "./components/TopPosts";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";
import Overview from "./components/Overview";



export default function App() {
  return (
    <>
    <AuthProvider>
      <PostsProvider>
        <Routes>
          <Route path="/getPosts" element={<Posts />} />
          <Route path="/topPosts" element={<TopPosts />} />
          <Route path="/upload-post" element={<CreatePost />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </PostsProvider>
      </AuthProvider>
    </>
  );
}