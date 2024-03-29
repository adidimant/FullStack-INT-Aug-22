import React, { useContext, useEffect, useState } from "react";
import { CardGroup, Container, Row } from "reactstrap";
import { PostsContext } from "../contexts/PostContext";
import TopPost from "./TopPost";
import { Link } from "react-router-dom";

export default function TopPosts() {
  const [postsData, setPostsData]:any = useContext(PostsContext);
  const [Posts, setPosts]:any = useState([]);

  const sortbyDate = (result: any) => {
    const dupResult = [...result];
    dupResult?.sort(function (object1: any, object2: any) {
      const date1 = new Date(object1?.date || object1?.dob.date);
      const date2 = new Date(object2?.date || object2?.dob.date);
      // to get a value that is either negative, positive, or zero.
      return date2.getTime() - date1.getTime();
    });
    dupResult.splice(3);
    return dupResult;
  };


useEffect(() => {
    setPosts(sortbyDate(postsData));
  }, [postsData]);//setting the current state

  return (
    <>
    
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Link to={'/Posts'}>
          Back to Posts
        </Link>
        <CardGroup>
          <Row>
            {Posts.map((post: any) => {
              return <TopPost post={post as any} />;
            })}
          </Row>
        </CardGroup>
      </Container>
    </>
  );
}
