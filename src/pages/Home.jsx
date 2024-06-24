import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Blogs from "../components/Blogs";
import axios from "axios";
import Categories from "../components/Categories";
import LatestBlog from "../components/LatestBlog";
import Search from "../components/Search";

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
    try {
      const totalBlog = await axios.get("http://localhost:5000/blogs");
      const start = totalBlog.data.length - 20;
      const end = totalBlog.data.length;
      const response = await axios.get(
        `http://localhost:5000/blogs?_end=${end}&_start=${start}`
      );
      if (response.status === 200) {
        const reversedBlogs = response.data.reverse();
        setLatestBlog(reversedBlogs);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleCategory = async (category) => {
    try {
      const url =
        category === "All"
          ? "http://localhost:5000/blogs"
          : `http://localhost:5000/blogs?category=${category}`;

      const newPath = category === "All" ? "/" : `/${category}`;
      window.history.pushState({}, "", newPath);

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
  const onInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/blogs?q=${searchValue}`
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

  return (
    <>
      <Search
        searchValue={searchValue}
        onInputChange={onInputChange}
        handleSearch={handleSearch}
      />
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
          size="4"
          md={2}
          className="bg-[#FF4F1F] mr-4 py-3 rounded text-white "
        >
          <p className="text-left py-2 text-sm md:text-lg font-bold">
            Latest Post
          </p>
          {latestBlog &&
            latestBlog.map((item, i) => (
              <LatestBlog key={i} {...item}></LatestBlog>
            ))}
        </MDBCol>
      </MDBRow>
    </>
  );
}
