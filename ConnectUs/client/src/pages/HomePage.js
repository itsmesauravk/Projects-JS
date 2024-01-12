import React, { useState, useEffect} from "react";
// import { UserContext } from "../UserContext";


function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric'};
  return new Date(dateString).toLocaleString('en-US', options);
}
const defaultMaleImage = "https://www.w3schools.com/howto/img_avatar.png";
const defaultFemaleImage = "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png";
const defaultCustomImage = "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg";

//formating time
function formatDateDifference(postDate) {
  const now = new Date();
  const formattedPostDate = new Date(postDate);
  
  const timeDiff = now - formattedPostDate;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Assuming 30 days in a month
  const years = Math.floor(days / 365); // Assuming 365 days in a year

  if (days === 0) {
    return "Today";
  } else if (days === 1) {
    return "Yesterday";
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months === 1) {
    return "1 month ago";
  } else if (months < 12) {
    return `${months} months ago`;
  } else if (years === 1) {
    return "1 year ago";
  } else {
    return `${years} years ago`;
  }
}


export default function HomePage() {
  // const {userInfo} = useContext(UserContext)
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  
  const imageLink = "http://localhost:4000/"
  //  console.log("UserInfo :", userInfo)

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
          // console.log("Data :", data)
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
  // console.log(posts)
  return (
    <div>
      {posts.length > 0 && (
        <div>
          <div className="flex flex-col gap-8 mt-5">
            {posts.map((post) => (
              <div key={post._id} className="bg-white border border-gray-300 shadow-md rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center mb-4">
                    {post.user && (
                      <img
                        src={
                          post.user.profileImage
                            ? imageLink + post.user.profileImage
                            : post.user.gender === 'male'
                            ? defaultMaleImage
                            : post.user.gender === 'female'
                            ? defaultFemaleImage
                            : defaultCustomImage
                        }
                        alt={`${post.user.firstName} ${post.user.surname}`}
                        className="w-12 h-12 rounded-full mr-2 object-cover"
                      />
                    
                    )}
                    <div>
                      {post.user && (
                        <>
                          <p className="text-sm font-semibold">{`${post.user.firstName} ${post.user.surname}`}</p>
                          <p className="text-xs text-gray-500">{formatDateDifference(formatDate(post.createdAt))} • 🌐</p>
                          {/* {console.log(formatDate(post.createdAt))} */}
                        </>
                      )}
                    </div>
                  </div>
                  
                </div>
                <p className="text-lg mb-2  text-gray-700 italic">
                  {post.caption}
                </p>

                <img 
                  src={imageLink + post.image}
                  alt={post.caption} 
                  style={{ width: '300px', height: '350px' }}
                  className="object-cover mb-2 rounded-md"
                />

                <div className="flex items-center space-x-4 mt-5">
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

      {loading && <div className="lds-circle"><div></div></div>}
    </div>

  );
}
