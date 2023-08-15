import React from 'react'
import { postModel } from '../models/postModel'
import { Card, CardBody, CardText, CardTitle, Col } from 'reactstrap'

export default function TopPost({ post }: { post: postModel }) {
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
        <img alt="Sample" src={post.img} />
        <CardBody>
          <CardTitle style={{ fontSize: '12px', fontWeight: 'bold' }}>{post.firstName}</CardTitle>
          <CardText style={{ fontSize: '10px' }}> {post.lastName}</CardText>
          <CardText style={{ fontSize: '10px' }}>  {post.country}</CardText>
          <CardText style={{ fontSize: '10px' }}>{post.date}</CardText>
        </CardBody>
      </Card>
    </Col>
  )
}
