import React, { useContext, useEffect, useState } from "react";
import { Button, CardGroup, Container, Row } from "reactstrap";
import Post from "./Post";
import { v4 as uuidv4 } from "uuid";
import { postsContext } from "../contexts/PostContext";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

export default function Posts() {
  const navigate = useNavigate();
  const [postsData,setPostsData]:any = useContext(postsContext);
  const [Posts, setPosts] = useState([])
  // console.log(postsData);

  useEffect(() => {
 setPosts(postsData);
  }, [postsData]);
  return (
    <>
   
      <Button onClick={() => { navigate("/upload-post") }}>
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
          <Row>
            {Posts.map((post) => {
              return <Post key={uuidv4()} post={post} />;
            })}
          </Row>
        </CardGroup>
      </Container>

    </>
  );
}
