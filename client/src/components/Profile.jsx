import React from "react";

const Profile = ({ post }) => {
  return (
    <div className="card1">
      <div className="card1_img">
        {post.image_author ? (
          <img src={post.author.image} alt="Avatar" />
        ) : (
          <img src="/images/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg" alt="Avatar" />
        )}
      </div>
      <h2>{post.author ? post.author.username : "N/A"}</h2>
      <p>{post.author ? post.author.jobs : "N/A"}</p>
      <div className="card1_social">
        <a href="https://github.com/lytruongsinh123">
          <i className="bi bi-github"></i>
        </a>
        <a href="https://www.facebook.com/profile.php?id=100038168222977">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="https://www.google.com/?authuser=0">
          <i className="bi bi-google"></i>
        </a>
        <a href="https://www.youtube.com/@duongdiep4813">
          <i className="bi bi-youtube"></i>
        </a>
      </div>
      <button>Contact</button>
    </div>
  );
};

export default Profile;
