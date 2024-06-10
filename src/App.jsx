import "./App.css";
import Header from "./components/Header";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addBlog" element={<AddBlog />} />
          <Route path="/editBlog/:id" element={<AddBlog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
