import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Blogs from "../components/Blogs";
import axios from "axios";
import Categories from "../components/Categories";
import LatestBlog from "../components/LatestBlog";

export default function Home() {
  const options = ["Travel", "Fashion", "Sports", "Food", "Technology"];
  const [data, setData] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadBlogsData();
    fetchLatestBlog();
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
  const fetchLatestBlog = async () => {
    const totalBlog = await axios.get("http://localhost:5000/blogs");
    const start = totalBlog.data.length - 4;
    const end = totalBlog.data.length;
    const response = await axios.get(
      `http://localhost:5000/blogs?_end=${end}&_start=${start}`
    );
    if (response.status === 200) {
      setLatestBlog(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleCategory = async (category) => {
    try {
      const url =
        category === "All"
          ? "http://localhost:5000/blogs"
          : `http://localhost:5000/blogs?category=${category}`;
      const response = await axios.get(url);
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
  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `http:/localhost:5000/blogs?q=${searchValue}`
    );
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <form className="m-auto p-4 -mr-[50%] max-w-[550px] content-center">
        <input
          type="text"
          placeholder="Search Blog..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <MDBBtn
          type="submit"
          onClick={handleSearch}
          className="bg-[#FF4F1F] w-[80px] h[80px]"
        >
          Search
        </MDBBtn>
      </form>
      <MDBCol className="flex flex-col justify-between">
        <Categories options={options} handleCategory={handleCategory} />
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
        <MDBCol
          size="3"
          className="bg-[#FF4F1F] h-[800px] rounded text-white m-2 p-2 "
        >
          <h4 className="text-left">Latest Post</h4>
          {latestBlog &&
            latestBlog.map((item, i) => (
              <LatestBlog key={i} {...item}></LatestBlog>
            ))}
        </MDBCol>
      </MDBRow>
    </>
  );
}
