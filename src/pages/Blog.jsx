import React, { useEffect, useState } from "react";
import Badge from "../components/Badge";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { MDBContainer, MDBIcon, MDBTypography } from "mdb-react-ui-kit";
export default function Blog() {
  const [blog, setBlog] = useState();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleBlog();
    }
  }, [id]);
  const getSingleBlog = async () => {
    const response = await axios.get(`http://localhost:5000/blogs/${id}`);
    if (response.status === 200) {
      setBlog(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <MDBContainer
        style={{
          border: "1px solid #d1ebe8",
          height: "100%",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <MDBTypography tag="h2" className="my-3 text-[#FF4F1F] inline-block">
          {blog && blog.title}
        </MDBTypography>{" "}
        <br />
        <Badge> {blog && blog.category}</Badge>
        <strong className="flex items-center py-3">
          <br />
          <MDBIcon far icon="calendar" />
          {blog && blog.date}
        </strong>
        <img
          src={blog && blog.imageUrl}
          className="rounded w-full max-h-[600px]"
        />
        <p className="my-2 text-left mb-3">{blog && blog.description}</p>
        <Link to="/" className="bg-[#f08080] text-white p-2 rounded">
          Go Back
        </Link>
      </MDBContainer>
    </>
  );
}
