import { Routes, Route, Link } from "react-router-dom";
import { PostsProvider } from "./contexts/PostContext";
import Posts from "./components/Posts";
import TopPosts from "./components/TopPosts";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import AuthProvider from './contexts/authProvider';
import { Navigate } from "react-router-dom";
import Overview from "./components/Overview";
import LogOut from "./components/LogOut";



export default function App() {
  return (
    <>
    <AuthProvider>
      <PostsProvider>
        <LogOut/>
        <Routes>
          <Route path="/Posts" element={<Posts />} />
          <Route path="/topPosts" element={<TopPosts />} />
          <Route path="/upload-post" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Overview" element= {<Overview/>}/>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </PostsProvider>
      </AuthProvider>
    </>
  );
}
