import React from 'react'
import { postModel } from '../models/postModel'
import { Card, CardBody, CardText, CardTitle, Col } from 'reactstrap'

export default function TopPost({ post }: any) {
  console.log(post)
  return (
    <Col sm={4}>
      <Card
        color="light"
        style={{
          width: "18rem",
          border: 'none',
          textAlign: 'center',
          marginBottom: '20px'
        }}
      >
        <img alt="Sample" src={post.image
                ? `http://localhost:3031/images/${post.image}`
                : post.picture.large} />
        <CardBody>
        <CardTitle style={{ fontSize: "12px", fontWeight: "bold" }}>
              {" "}
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
            <CardText style={{ fontSize: "10px" }}>
              {post.date || post.dob.date}
            </CardText>
        </CardBody>
      </Card>
    </Col>
  )
}
