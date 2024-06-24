import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-router-dom";

export default function LatestBlog({ imageUrl, title, id }) {
  return (
    <>
      <Link to={`/blog/${id}`}>
        <MDBCard className="max-w-[300px] mt-2 flex items-center justify-center">
          <MDBRow className="g-0">
            <MDBCol md="3">
              <MDBCardImage
                src={imageUrl}
                alt={title}
                fluid
                className="w-[300px] h-[200px] rounded m-3"
              ></MDBCardImage>
            </MDBCol>
            <MDBCol md="9">
              <MDBCardBody>
                <p className="flex items-center justify-center font-bold ">
                  {title}
                </p>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </Link>
    </>
  );
}
