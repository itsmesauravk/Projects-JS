import React, { useState, useEffect } from "react";

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  return new Date(dateString).toLocaleString('en-US', options);
}
const defaultMaleImage = "https://www.w3schools.com/howto/img_avatar.png";
const defaultFemaleImage = "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png";
const defaultCustomImage = "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg";


export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/allpost", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
          setPosts(data); // Update state with fetched posts
        } else {
          alert("Posts not found");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div>

      {loading && <div className="lds-circle"><div></div></div>}

      {posts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Posts:</h2>
          <div className="flex flex-col gap-8">
            {posts.map((post) => (
              <div key={post._id} className="bg-white border border-gray-300 shadow-md rounded-md p-4">
                <div className="flex items-center mb-4">
                  <img
                    src={post.user.profileImage || post.user.gender === 'male' ? defaultMaleImage : post.user.gender === 'female' ? defaultFemaleImage : defaultCustomImage}
                    alt={`${post.user.firstName} ${post.user.surname}`}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-sm font-semibold">{`${post.user.firstName} ${post.user.surname}`}</p>
                    <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                  </div>
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

      {posts.length === 0 && !loading && <p>No posts available.</p>}
    </div>
  );
}
