import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Blogs from "../components/Blogs";
import axios from "axios";
import Categories from "../components/Categories";

export default function Home() {
  const options = ["Travel", "Fashion", "Sports", "Food", "Technology"];
  const [data, setData] = useState([]);

  useEffect(() => {
    loadBlogsData();
  }, []);

  const loadBlogsData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs");
      if (response.status === 200) {
        setData(response.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleCategory = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/blogs?category=${category}`
      );
      if (response.status === 200) {
        setData(response.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if (response.status === 200) {
        toast.success("Blog successfully deleted");
        loadBlogsData();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + "...";
    }
    return str;
  };

  return (
    <>
      <MDBCol className="flex flex-col justify-between">
        <Categories
          options={options}
          handleCategory={handleCategory}
          className="flex justify-between items-center"
        />
      </MDBCol>
      <MDBRow>
        {data && data.length === 0 && (
          <MDBTypography className="text-center text-red-800 text-5xl">
            No blog found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data &&
                data.map((item, i) => (
                  <Blogs
                    key={i}
                    {...item}
                    excerpt={excerpt}
                    handleDelete={handleDelete}
                  />
                ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </>
  );
}
