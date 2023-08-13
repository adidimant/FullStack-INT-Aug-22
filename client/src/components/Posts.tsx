import React, { useContext, useEffect, useState } from "react";
import { Button, CardGroup, Container, Row } from "reactstrap";
import Post from "./Post";
import { v4 as uuidv4 } from "uuid";
import { FiInstagram } from "react-icons/fi";
import { postsContext } from "../contexts/PostContext";
import { useAuthContext } from "../contexts/authProvider";
import { useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

export default function Posts() {
  const navigate = useNavigate();
  const postsData = useContext(postsContext);
  const {username, dispatch: dispatchAuthContext } = useAuthContext();
  const [Posts,setPosts] = useState([])
  console.log(postsData);

  useEffect(() => {
    async function getDataFromServer() {

      const response = await axiosClient.get(`http://localhost:3031/getPosts/${username}`, {
        method: "GET",
        withCredentials: true,
      });
      const result = response?.data;
      const setToContext = postsData[1] as Function
      //adding the posts to the context
      if (result) {
        // setToContext(result);
        //adding the posts to the current state
        setPosts(result);
      }
    }
  
    getDataFromServer();
  }, [postsData]);
  return (
    <>
    
      <div style={{ display: "flex", alignItems: "center" }}>
        <h5>Instegram </h5>
        <FiInstagram
          style={{ color: "black", fontSize: "20px", margin: "5px" }}
        />
      </div>
      <Button onClick={()=>{navigate("/upload-post")}}>
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
