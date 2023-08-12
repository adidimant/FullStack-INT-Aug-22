import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button, CardGroup, Container, Row } from "reactstrap";
import Post from "./Post";
import { v4 as uuidv4 } from "uuid";
import { FiInstagram } from "react-icons/fi";
import { postsContext } from "../contexts/PostContext";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";
import { postModel } from "../models/postModel";
import { TempLogout } from "../contexts/authProvider";





export default function Posts() {
  const navigate = useNavigate();
  const [postsData, setPostdata] = useContext(postsContext);
  const [Posts, setPosts] = useState([]);
  console.log(postsData);

  useEffect(() => {
    setPosts(postsData);
    console.log(postsData);
  }, [postsData]);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h5>Instegram </h5>
        <FiInstagram
          style={{ color: "black", fontSize: "20px", margin: "5px" }}
        />
      </div>
      <Button
        onClick={() => {
          navigate("/upload-post");
        }}
      >
        Add post
      </Button>
      <Link to={'/topPosts'}>
        to Top Posts
      </Link>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <CardGroup>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {Posts?.map((post: postModel) => {
              return <Post key={uuidv4()} post={post} />;
            })}
          </div>
        </CardGroup>
      </Container>
    </>
  );
}
