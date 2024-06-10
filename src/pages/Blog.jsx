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
      <MDBContainer style={{ border: "1px solid #d1ebe8" }}>
        <MDBTypography tag="h2" className="mt-2 text-[#FF4F1F] inline-block">
          {blog && blog.title}
        </MDBTypography>{" "}
        <br />
        <strong className="flex items-center p-3">
          <MDBIcon far icon="calendar" />
          {blog && blog.date}

          <Badge> {blog && blog.category}</Badge>
        </strong>
        <img
          src={blog && blog.imageUrl}
          className="rounded w-full max-h-[600px]"
        />
        <p className="mt-3 text-left">{blog && blog.description}</p>
        <Link to="/">Go Back</Link>
      </MDBContainer>
    </>
  );
}
