import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";


function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return new Date(dateString).toLocaleString('en-US', options);
  }

  const defaultMaleImage = "https://www.w3schools.com/howto/img_avatar.png";
  const defaultFemaleImage = "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png";
  const defaultCustomImage = "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg";
  
  
  
  export default function YourPost() {
      const { userInfo } = useContext(UserContext);
      const userId = userInfo.id;
   
      const [posts, setYourPost] = useState([]);

      const showUserPost = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/yourpost/${userId}`);
          const data = response.data;
          setYourPost(data);
        } catch (error) {
          console.log(error);
        }
      };
      
      showUserPost();
      
    showUserPost();
//   }, [userId]); // Add userId as a dependency to fetch data when userId changes

  const user = posts.user
  console.log("YourPost :",posts)
//   console.log("YourPostUser :",user)

  return (
    <div>
        
        <div className="bg-white border border-gray-300 shadow-md rounded-md p-4">
            <div className="flex items-center mb-4">
                <img
                src={user.profileImage || user.gender === 'male' ? defaultMaleImage : user.gender === 'female' ? defaultFemaleImage : defaultCustomImage}
                alt={`${user.firstName} ${user.surname}`}
                className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                <p className="text-sm font-semibold">{`${user.firstName} ${user.surname}`}</p>
                <p className="text-xs text-gray-500">{formatDate(user.dateOfBirth)}</p>
                </div>
            </div>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.gender}</p>
        </div>

      <h1>Your Post</h1>
      {posts.length > 0 && (
        <div>
          {/* <h2 className="text-2xl font-bold mb-4">Posts:</h2> */}
          <div className="flex flex-col gap-8 mt-5">
            {posts.map((post) => (
              <div key={post._id} className="bg-white border border-gray-300 shadow-md rounded-md p-4">
                <div className="flex items-center justify-between mb-4">

                  <div className="flex items-center  mb-4" >
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
                  {userInfo.id === post.user._id && (
                    <div className="flex gap-4">
                       <button className="ml-auto text-xs text-blue-500 font-bold hover:text-blue-800">edit</button>
                        <button className="ml-auto text-xs text-red-500 font-bold hover:text-red-800">Delete</button>
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
