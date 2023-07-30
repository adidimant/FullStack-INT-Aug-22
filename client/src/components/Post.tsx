import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Col,
} from "reactstrap";
// import {postModel} from "../models/postModel";


export default function Post({ post }: { post: any }) {

  return (
    <>
      <Col sm={4}>
        <Card
          color="light"
          style={{
            width: "18rem",
            border: "none",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >

          <img src={ post.image? `http://localhost:3031/images/${post.image}` : post.picture.large } alt="" />
      
          <CardBody>
            <CardTitle style={{ fontSize: "12px", fontWeight: "bold" }}>
              {post.userName || post.name.first}
            </CardTitle>
            <CardText style={{ fontSize: "10px" }}>
              {" "}
              {post.description || post.name.last}
            </CardText>
            <CardText style={{ fontSize: "10px" }}>
              {" "}
              {post.postName || post.email}
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}
