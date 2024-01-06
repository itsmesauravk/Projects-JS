import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleString('en-US', options);
}

const defaultMaleImage = "https://www.w3schools.com/howto/img_avatar.png";
const defaultFemaleImage = "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png";
const defaultCustomImage = "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg";

export default function YourPost() {
  const { userInfo } = useContext(UserContext);
  const userId = userInfo.id;
  const [posts, setYourPosts] = useState([]);
  const [postId, setPostId] = useState("");

  const showUserPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/yourpost/${userId}`);
      const data = response.data;
      console.log("Fetched data:", data);
      setYourPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    showUserPosts();
  }, [userId]); 

  useEffect(() => {
    const deletePost = async () => {
      try {
        const response = await axios.delete(`http://localhost:4000/deletepost/${postId}`);
        console.log("Delete response:", response.data);
        // After successful deletion, you may want to refresh the posts
        showUserPosts();
      } catch (error) {
        console.error("Delete error:", error);
        // Additional logging for server response
        if (error.response) {
          console.error("Server response data:", error.response.data);
        }
      }
    };

    // Call deletePost function when postId is not an empty string
    if (postId) {
      deletePost();
      // Reset postId after deletion
      setPostId("");
    }
  }, [postId, showUserPosts]);

  return (
    <div>
      <div className="bg-white border border-gray-300 shadow-md rounded-md p-4">
        <div className="flex items-center mb-4">
          <img
            src={userInfo.profileImage || (userInfo.gender === 'male' ? defaultMaleImage : userInfo.gender === 'female' ? defaultFemaleImage : defaultCustomImage)}
            alt={`${userInfo.firstName} ${userInfo.surname}`}
            className="w-16 h-16 rounded-full mr-2"
          />
          <div>
            <p className="text-xl font-semibold">{`${userInfo.firstName} ${userInfo.surname}`}</p>
            {posts.length > 0 && posts[0].user.dateOfBirth ? (
              <p className="text-xs text-purple-800">{formatDate(posts[0].user.dateOfBirth)}</p>
            ) : (
              <p>No date of birth available.</p>
            )}
          </div>
        </div>
        <p className="text-sm text-green-700 font-bold">Email: {userInfo.email}</p>
        <p className="text-sm text-gray-600 font-bold">Gender: {userInfo.gender}</p>
      </div>

      <h1 className="text-3xl font-bold mb-4 mt-4">Your Posts:</h1>

      <div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
          <Link to={`/newpost/${userId}`}>Add New Post</Link>
        </button>
      </div>

      {posts.length > 0 && (
        <div>
          <div className="flex flex-col gap-8 mt-5">
            {posts.map((post) => (
              <div key={post._id} className="bg-white border border-gray-300 shadow-md rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center mb-4">
                    <img
                      src={post.user.profileImage || (post.user.gender === 'male' ? defaultMaleImage : post.user.gender === 'female' ? defaultFemaleImage : defaultCustomImage)}
                      alt={`${post.user.firstName} ${post.user.surname}`}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <p className="text-sm font-semibold">{`${post.user.firstName} ${post.user.surname}`}</p>
                      <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                    </div>
                  </div>
                  {userInfo.id === post.user._id && (
                    <div className="flex gap-4">
                      <button
                        className="ml-auto text-xs text-blue-500 font-bold hover:text-blue-800"
                      >
                        Edit
                      </button>

                      <button
                        className="ml-auto text-xs text-red-500 font-bold hover:text-red-800"
                        onClick={() => setPostId(post._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-lg font-bold mb-2">{post.caption}</p>
                <img src={post.image} alt={post.caption} className="w-full h-32 object-cover mb-2 rounded-md" />
                <div className="flex items-center space-x-4">
                  <button className="text-blue-500">Like</button>
                  <button className="text-gray-500">Comment</button>
                  <button className="text-gray-500">Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
