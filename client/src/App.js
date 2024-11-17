import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import {
  LoadingProvider,
  LoadingContext,
} from "./LoaddingContext";
import LoadingOverlay from "./components/Loadding";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Layout from "./components/Layout";
import UpdateInfor from "./components/Updateinfor";
import Postblog from "./components/Postblog";
import Bloglist from "./components/Bloglist";
import Blogposted from "./components/Blogposted";
import Updatepost from "./components/Updatepost";
import Detailpost from "./components/Detailpost";
import SearchResult from "./components/Searchresult";
import Porfolio from "./components/Portfolio";
import { AuthProvider } from "./AuthContext";
import "./styles/style.css";
import "./styles/porfolio.css";
import "./styles/update.css";
import "./styles/button.css";
import "./styles/loadding.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [earliestBlogs, setEarliestBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://server-azure-omega.vercel.app/bloglist");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length === 0) return;

    const sortedBlogs = [...blogs]
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(0, 5);

    const formattedBlogs = sortedBlogs.map((post, index) => ({
      id: post.id,
      bgImage: post.image,
      title: post.title || "No Title",
      desc: post.content.slice(0, 500) + (post.content.length > 500 ? "..." : ""),
    }));

    setEarliestBlogs(formattedBlogs);
  }, [blogs]);

  return (
    <AuthProvider>
      <LoadingProvider>
        <Router>
          <LoadingOverlay />
          <Layout>
            <RoutesWithLoading posts={earliestBlogs} />
          </Layout>
        </Router>
      </LoadingProvider>
    </AuthProvider>
  );
};

const RoutesWithLoading = ({ posts }) => {
  const { setIsLoading } = useContext(LoadingContext);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500); // Thời gian loading
    return () => clearTimeout(timer);
  }, [location, setIsLoading]);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home posts={posts} />} />
      <Route path="/updateinfor" element={<UpdateInfor />} />
      <Route path="/postblog" element={<Postblog />} />
      <Route path="/blog" element={<Bloglist />} />
      <Route path="/blogposted" element={<Blogposted />} />
      <Route path="/updatepost/:id" element={<Updatepost />} />
      <Route path="/detailpost/:id" element={<Detailpost />} />
      <Route path="/search" element={<SearchResult />} />
      <Route path="/portfolio" element={<Porfolio />} />
    </Routes>
  );
};

export default App;
