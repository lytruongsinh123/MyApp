import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import Postcard from "./Postcard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
function Home({ posts }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Sort posts by date (assuming each post has a `date` field)
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    // Take the 5 most recent posts
    const recentPosts = sortedPosts.slice(0, 5);
    setData(recentPosts);
  }, [posts]);

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/bloglist");
      // Take only the first 5 blogs from the response
      const recentBlogs = response.data.slice(0, 5);
      setBlogs(recentBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Fetch blog list when the component is mounted
  }, []);
  
  return (
    <div className="center">
      {/* React Bootstrap Carousel with dynamic content from blogs */}

      <Carousel>
        {blogs.map((blog, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={blog.image} // Dynamically load image from the blog data
              alt={`Slide ${index + 1}`} // Dynamically set alt text
            />
            <Carousel.Caption>
              <h5>
                <strong style={{ fontSize: "30px" }}>{blog.title}</strong>
              </h5>{" "}
              {/* Dynamically load the title */}
              <p>
                {blog.content.length > 200
                  ? `${blog.content.substring(0, 200)}...`
                  : blog.content}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Postcards Grid */}
      <div
        style={{
          width: "100%",
          display: "grid",
          gridColumn: "span 3",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          padding: "16px",
          placeItems: "center",
          justifyContent: blogs.length % 3 === 1 ? "start" : "center", // Căn toàn bộ lưới
        }}
      >
        {blogs.map((blog, index) => (
          <Postcard
            key={index}
            image={blog.image} // Passing image for each blog
            title={blog.title} // Passing title for each blog
            content={blog.content} // Passing content for each blog
            id={blog._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
