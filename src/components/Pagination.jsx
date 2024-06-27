import {
  MDBBtn,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import React from "react";

export default function Pagination({
  currentPage,
  pageLimit,
  loadBlogsData,
  data,
  totalBlog,
}) {
  const renderPagination = () => {
    if (currentPage === 0) {
      return (
        <MDBPagination center>
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() => loadBlogsData(5, 10, 1)}
              style={{
                backgroundColor: "#FF4F1F",
                borderRadius: "3rem",
                marginBottom: "3rem",
              }}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <MDBPagination center>
          <MDBPaginationItem>
            <MDBBtn
              style={{
                backgroundColor: "#FF4F1F",
                borderRadius: "3rem",
                marginBottom: "3rem",
              }}
              onClick={() =>
                loadBlogsData((currentPage - 1) * 5, currentPage * 5, -1)
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              style={{
                backgroundColor: "#FF4F1F",
                borderRadius: "3rem",
              }}
              onClick={() =>
                loadBlogsData((currentPage + 1) * 5, (currentPage + 2) * 5, 1)
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination center>
          <MDBPaginationItem>
            <MDBBtn
              style={{
                backgroundColor: "#FF4F1F",
                borderRadius: "3rem",
              }}
              onClick={() =>
                loadBlogsData((currentPage - 1) * 5, currentPage * 5, -1)
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };
  return <div>{renderPagination()}</div>;
}
