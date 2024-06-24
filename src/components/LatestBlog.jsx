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
        <MDBCard className="max-w-[300px] mt-2">
          <MDBRow className="g-0">
            <MDBCol md="4" className="flex m-1 items-center justify-center">
              <MDBCardImage
                src={imageUrl}
                alt={title}
                fluid
                className="w-16 h-16 md:w-40 md:h-40 rounded m-2"
              ></MDBCardImage>
            </MDBCol>
            <MDBCol md="2">
              <MDBCardBody>
                <p className="flex font-bold text-wrap text-[#FF4F1F] text-xs md:text-base ">
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
