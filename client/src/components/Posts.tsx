import React, { useContext, useEffect, useState } from "react";
import { Button, CardGroup, Container, Row } from "reactstrap";
import Post from "./Post";
import { v4 as uuidv4 } from "uuid";
import { postsContext } from "../contexts/PostContext";
import { useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

export default function Posts() {
  const navigate = useNavigate();
  const postsData = useContext(postsContext);
  const [Posts, setPosts] = useState([])
  // console.log(postsData);

  useEffect(() => {
    async function getDataFromServer() {
      // axios
      //   .get("http://localhostn:3031/getPosts")
      //   .then((res) => {
      //     console.log(res)
      //    setPostData(res.data)
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      const response = await axiosClient.get("http://localhost:3031/getPosts", {
        method: "GET",
        withCredentials: true,
      });
      const result = response?.data;
      const setToContext = postsData[1] as Function
      //adding the posts to the context
      if (result) {
        setToContext(result);
        //adding the posts to the current state
        setPosts(result);
      }
    }

    getDataFromServer();
  }, []);
  return (
    <>
      <Button onClick={() => { navigate("/upload-post") }}>
        Add post
      </Button>
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
