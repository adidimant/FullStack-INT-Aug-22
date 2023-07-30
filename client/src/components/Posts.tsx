import React, { useContext } from "react";
import { Button, CardGroup, Container, Row } from "reactstrap";
import Post from "./Post";
import { v4 as uuidv4 } from "uuid";
import { FiInstagram } from "react-icons/fi";
import { postsContext } from "../postsContext/PostConext";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const navigate = useNavigate()
  const postsData = useContext(postsContext);
  console.log(postsData);
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
            {postsData.map((post) => {
              return <Post key={uuidv4()} post={post} />;
            })}
          </Row>
        </CardGroup>
      </Container>

    </>
  );
}