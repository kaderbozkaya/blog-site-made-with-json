import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Search from "../components/Search";
import Categories from "../components/Categories";
import Blogs from "../components/Blogs";
import LatestBlog from "../components/LatestBlog";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import Pagination from "../components/Pagination";

const Home = () => {
  const options = ["Travel", "Fashion", "Sports", "Food", "Technology"];
  const [data, setData] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBlog, setTotalBlog] = useState(0);
  const [pageLimit] = useState(5);

  useEffect(() => {
    loadBlogsData(0, 5, 0);
    fetchLatestBlog();
  }, []);

  const loadBlogsData = async (start, end, increase) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/blogs?_start=${start}&_end=${end}`
      );
      if (response.status === 200) {
        setData(response.data);
        setCurrentPage(currentPage + increase);
      } else {
        toast.error("Failed to load blogs");
      }
    } catch (error) {
      console.error("Error loading blogs data:", error);
      toast.error("Failed to load blogs");
    }
  };

  const fetchLatestBlog = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs");
      if (response.status === 200) {
        const totalBlogData = response.data;
        setTotalBlog(totalBlogData.length);
        const start = totalBlogData.length - 20;
        const latestBlogs = totalBlogData.slice(start).reverse();
        setLatestBlog(latestBlogs);
      } else {
        toast.error("Failed to fetch latest blogs");
      }
    } catch (error) {
      console.error("Error fetching latest blogs:", error);
      toast.error("Failed to fetch latest blogs");
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
        const newPath = category === "All" ? "/" : `/${category}`;
        window.history.pushState({}, "", newPath);
      } else {
        toast.error("Failed to load category");
      }
    } catch (error) {
      console.error("Error handling category:", error);
      toast.error("Failed to load category");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if (response.status === 200) {
        toast.success("Blog successfully deleted");
        loadBlogsData(
          currentPage * pageLimit,
          (currentPage + 1) * pageLimit,
          0
        );
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  const excerpt = (str) => {
    return str.length > 50 ? str.substring(0, 50) + "..." : str;
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
        toast.error("Failed to search blogs");
      }
    } catch (error) {
      console.error("Error searching blogs:", error);
      toast.error("Failed to search blogs");
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
        {data.length === 0 ? (
          <MDBTypography className="text-center text-red-800 text-5xl">
            No blog found
          </MDBTypography>
        ) : (
          <MDBCol>
            <MDBContainer>
              <MDBRow>
                {data.map((item, i) => (
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
        )}
        <MDBCol
          size="4"
          md={3}
          lg={2}
          className="bg-[#FF4F1F] mr-4 py-3 rounded text-white"
        >
          <p className="text-left py-2 text-sm md:text-lg font-bold">
            Latest Post
          </p>
          {latestBlog.map((item, i) => (
            <LatestBlog key={i} {...item} />
          ))}
        </MDBCol>
      </MDBRow>
      <div className="mt-3">
        <Pagination
          currentPage={currentPage}
          loadBlogsData={loadBlogsData}
          pageLimit={pageLimit}
          data={data}
          totalBlog={totalBlog}
        />
      </div>
    </>
  );
};

export default Home;
