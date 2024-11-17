import React, { useState, useEffect } from "react";
import axios from "axios";

const Like = ({ postId, initialLikes, isLoggedIn, userId }) => {
  const [likesCount, setLikesCount] = useState(initialLikes); // Số lượng like ban đầu
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    setIsLiked(false);
  }, [initialLikes, userId]);

  console.log(isLiked)

  const handleLike = async () => {
    if (!isLoggedIn) {
      alert("Bạn chưa đăng nhập");
      return;
    }
    setIsLiked(!isLiked);
    setLikesCount((prevCount) => prevCount + (isLiked ? -1 : 1));
    const method = isLiked ? "PUT" : "POST";
    
    try {
      const response = await axios({
        method: method,
        url: `https://server-azure-omega.vercel.app/api/home/${userId}/posts/${postId}/like`,
        data: {
          userId: userId,
          postId: postId
        },
      });

      // Xử lý response nếu cần thiết
      if (response.status === 200) {
        // Nếu phản hồi thành công, có thể cần xử lý thêm dữ liệu ở đây
        console.log("Like action success:", response.data);
        // Ví dụ: bạn có thể lấy lại số lượng like từ server nếu muốn đồng bộ hóa lại
        // setLikesCount(response.data.likesCount);
      }

    } catch (error) {
      if (error.response) {
        // Lỗi từ phản hồi của server
        console.error("Lỗi khi like bài viết:", error.response.data);
        console.error("Mã lỗi HTTP:", error.response.status);
        console.error("Header của phản hồi:", error.response.headers);
      } else if (error.request) {
        // Không nhận được phản hồi từ server
        console.error("Không nhận được phản hồi từ server:", error.request);
      } else {
        // Lỗi trong việc thiết lập yêu cầu
        console.error("Lỗi khi gửi yêu cầu:", error.message);
      }
      // Quay lại số lượng like trước khi lỗi xảy ra
      setLikesCount((prevCount) => prevCount - (isLiked ? -1 : 1));
    }
  };

  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <div style={{display: "flex", alignItems: "center", padding: "10px"}}>{likesCount} Likes</div> 
      <button className="button button-like" onClick={handleLike}>
        <i className="fa fa-heart"></i>
        <span>Like</span>
      </button>
    </div>
  );
};

export default Like;
