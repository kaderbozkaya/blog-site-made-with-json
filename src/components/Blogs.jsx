import React from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Badge from "./Badge";

export default function Blogs({
  title,
  category,
  description,
  id,
  imageUrl,
  excerpt,
  handleDelete,
}) {
  return (
    <>
      <MDBCol size={12} md={4}>
        <MDBCard className="h-96 mt-2" style={{ maxWidth: "22rem" }}>
          <MDBCardImage
            src={imageUrl}
            alt={title}
            position="top"
            style={{ maxWidth: "100%", height: "180px" }}
          ></MDBCardImage>
          <MDBCardBody>
            <MDBCardTitle>{title}</MDBCardTitle>
            <MDBCardText>
              {excerpt(description)}
              <br />
              <Link to={`/blog/${id}`} className="text-[#ff4f1f]">
                Read More
              </Link>
            </MDBCardText>
            <Badge>{category}</Badge>
            <span>
              <MDBBtn
                className="mt-1"
                tag="a"
                color="none"
                onClick={() => handleDelete(id)}
              >
                <MDBIcon
                  fas
                  icon="trash"
                  style={{ color: "#dd4b39" }}
                  size="lg"
                />
              </MDBBtn>
              <Link to={`/editBlog/${id}`}>
                <MDBIcon
                  fas
                  icon="edit"
                  style={{ color: "#55acee", marginLeft: "10px" }}
                  size="lg"
                />
              </Link>
            </span>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </>
  );
}
