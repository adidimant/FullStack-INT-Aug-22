import { Routes, Route } from "react-router-dom";
import { PostsProvider } from "./contexts/PostContext";
import Posts from "./components/Posts";
import TopPosts from "./components/TopPosts";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import AuthProvider from './contexts/authProvider';
import { Navigate } from "react-router-dom";
import Overview from "./components/Overview/Overview";
import Nav from "./components/Nav";

export default function App() {

  return (
    <AuthProvider>
      <PostsProvider>
        <Routes>
          <Route path='/' element={<Nav />}>
            <Route path="/login" element={<Login />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/topPosts" element={<TopPosts />} />
            <Route path="/upload-post" element={<CreatePost />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      </PostsProvider>
    </AuthProvider>
  );
}
