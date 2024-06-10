import React, { useEffect, useState } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddBlog() {
  const initialState = {
    title: "",
    description: "",
    category: "",
    imageUrl: "",
  };
  const options = ["Travel", "Fashion", "Sports", "Food", "Technology"];
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { title, description, category, imageUrl } = formValue;

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setEditMode(true);
      getSingleBlog(id);
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);
  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
    if (singleBlog.status === 200) {
      setFormValue({ ...singleBlog.data });
    } else {
      toast.error("Something went wrong");
    }
  };
  const getDate = () => {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, "0");
    let month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
    let year = today.getFullYear();
    return month + "/" + day + "/" + year;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrMsg("Please select a category");
    }
    const imageValidation = !editMode ? imageUrl : true;
    if (title && description && imageUrl && category) {
      const currentDate = getDate();
      if (!editMode) {
        const updatedBlogData = { ...formValue, date: currentDate };
        try {
          const response = await axios.post(
            "http://localhost:5000/blogs",
            updatedBlogData
          );
          if (response.status === 201) {
            toast.success("Blog created successfully");
            setFormValue(initialState);
            navigate("/");
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      } else {
        try {
          const response = await axios.put(
            `http://localhost:5000/blogs/${id}`,
            formValue
          );
          if (response.status === 200) {
            toast.success("Blog updated successfully");
            setFormValue(initialState);
            navigate("/");
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      }
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onUploadImg = (file) => {
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("upload_preset", "y0ohvteg");
    axios
      .post("https://api.cloudinary.com/v1_1/dadsdfuol/image/upload", formData)
      .then((resp) => {
        toast.info("Image uploaded successfully");
        setFormValue({ ...formValue, imageUrl: resp.data.url });
      })
      .catch((error) => {
        toast.error("Image upload failed");
      });
  };

  const onCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setFormValue({ ...formValue, category: e.target.value });
  };

  return (
    <>
      <MDBValidation
        className="row g-3 shadow-lg shadow-orange-600 rounded-md"
        style={{ marginTop: "100px" }}
        noValidate
        onSubmit={handleSubmit}
      >
        <p className="fs-2 fw-bold">{editMode ? "Update Blog" : "Add Blog"}</p>
        <div className="m-auto p-3 max-w-96 ">
          <MDBInput
            value={title}
            name="title"
            type="text"
            onChange={onInputChange}
            label="Title"
            validation="Please provide a title"
            invalid
            required
          ></MDBInput>
          <MDBInput
            className="mt-2 mb-2"
            value={description}
            name="description"
            type="text"
            onChange={onInputChange}
            label="Description"
            validation="Please provide a description"
            invalid
            required
          ></MDBInput>
          {!editMode && (
            <>
              <MDBInput
                type="file"
                onChange={(e) => onUploadImg(e.target.files)}
                validation="Please provide an image"
                invalid
                required
              ></MDBInput>
              <br />
            </>
          )}

          <select
            name="category"
            id="category"
            className="w-full rounded-sm h-9 border"
            onChange={onCategoryChange}
          >
            <option>Please select category</option>
            {options.map((option, i) => (
              <option value={option} key={i}>
                {option}
              </option>
            ))}
          </select>
          {categoryErrMsg && (
            <div className="text-red-800 text-center text-sm">
              {categoryErrMsg}
            </div>
          )}

          <MDBBtn
            type="submit"
            style={{
              marginRight: "10px",
              marginTop: "10px",
              backgroundColor: "#ff4f1f",
            }}
          >
            {editMode ? "Update" : "Add"}
          </MDBBtn>
          <MDBBtn
            type="button"
            style={{ marginRight: "10px", backgroundColor: "#f08080" }}
            onClick={() => navigate("/")}
          >
            Go Back
          </MDBBtn>
        </div>
      </MDBValidation>
    </>
  );
}
