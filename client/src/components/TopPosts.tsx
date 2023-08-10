import React, { useContext, useEffect, useState } from "react";
import { CardGroup, Container, Row } from "reactstrap";
import { postsContext } from "../contexts/PostContext";
import TopPost from "./TopPost";

export default function TopPosts() {
  const [postsData, setPostData] = useContext(postsContext);
  console.log(postsData);

  // function topDate() {
  //   const sortposts = postsData.sort(function (a, b) {
  //     return (
  //       Date.parse(b.dob.date as string ) - Date.parse(a.dob.date as string)
  //     );
  //   });
  //   const topPosts = sortposts.slice(0, 3);
  //   setTopDatePost(topPosts as any);
  // }
  // useEffect(() => {
  //   topDate();
  // }, []);

  const topDatePost: any = [];

  return (
    <>
      <>
        {topDatePost.forEach((post: any) => {
          return <p>{post as any}</p>;
        })}
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
              {topDatePost.map((post: any) => {
                return <TopPost post={post as any} />;
              })}
            </Row>
          </CardGroup>
        </Container>
      </>
    </>
  );
}
