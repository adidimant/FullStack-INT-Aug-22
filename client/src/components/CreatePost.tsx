import React, { useContext, useRef, useEffect, useState } from "react";
import { Input, Button, Form, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../contexts/authProvider";

export default function CreatePost() {
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const Auth = useAuthContext()
  // const formElenemt = useRef() as any;

  function uploadImage(event: any) {
    setImage(event.target.files[0]);
    console.log(image);
  }

  async function uploadPost(event: any) {
    event.preventDefault();

    const data = new FormData();
    data.append("image", image);
    data.append("postName", event.target.postName.value);
    data.append("description", event.target.description.value);
    data.append("userName", event.target.userName.value);
    data.append("date", event.target.date.value);

    const res = await axios.post(
      `http://localhost:3031/upload-post/${Auth.userName}`,
      data,
      { withCredentials: true }
    );
    console.log("Request complete! response:", res);
    navigate("/Posts");
  }


  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        <Form
          className="my-5 d-flex flex-column align-items-stretch"
          style={{
            width: "300px",
            height: "300px",
            alignItems: "stretch",
            justifyContent: "space-between",
          }}
          // ref={formElenemt}
          onSubmit={uploadPost}
        >
          <Input type="file" name="image" multiple onChange={uploadImage} />
          <Input id="postName" type="text" placeholder="post Name" />
          <Input id="description" type="text" placeholder="description" />
          <Input id="userName" type="text" placeholder="userName" />
          <Input id="date" type="date" placeholder="date" />
          <Button type="submit">Add New Post</Button>
        </Form>
      </Container>
    </>
  );
}
