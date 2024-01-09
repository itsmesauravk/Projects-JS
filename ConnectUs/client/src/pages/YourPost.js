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
  const [editPostId, setEditPostId] = useState("");
  const [caption,setCaption] = useState("")
  const [image,setImage] = useState(null)

  const [loading, setLoading] = useState(false);


  // const [editRedirect,setEditRedirect] = useState(false)

 

  const showUserPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/yourpost/${userId}`);
      const data = response.data;
      // console.log("Fetched data:", data);
      setYourPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    showUserPosts();
  }, [userId]); 

  // Delete post (not working currently)
  const deletePost = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");

    if(confirmDelete){
      try {
        const response = await axios.delete(`http://localhost:4000/deletepost/${postId}`);
        const data = response.data;
        console.log("Post deleted:", data);
        showUserPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };


  useEffect(()=>{
    if(postId){
      deletePost();
      setPostId("");
    }
  }, [postId])



  const updateEditPost = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData()
        formData.append("image",image)
        const response = await axios.patch(`http://localhost:4000/updatepost/${editPostId}`, {
            caption: caption,
            formData
        });
        console.log(response);
        
        if (response.status === 200) {
            console.log("Post Updated");
            setEditPostId("");
          
            showUserPosts();
        } else {
            alert("Post not Updated");
        }
    } catch (error) {
        console.error("Error updating post:", error);
    }
};

// if(editRedirect){
//   return <Navigate to={`/yourpost/${userId}`} />
// }


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

      <div className="mt-4 flex gap-2">
        <button className=" text-sm bg-purple-600 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-full ">
          <Link to={`/home`}>Home</Link>
        </button>
        <button className="text-sm bg-purple-600 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-full ">
          <Link to={`/newpost/${userId}`}>Add New Post</Link>
        </button>
        <button className="text-sm bg-purple-600 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-full ">
          <Link to={`/profilesetting/${userId}`}>Edit Profile</Link>
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-3 mt-3">Your Posts:</h1>
      {/* edit Div */}
      {editPostId && (
          <div className="border border-gray-300 shadow-md rounded-md p-4 mt-8">
            <h2 className="text-2xl font-semibold mb-4">Edit post</h2>
            <form>
              <label htmlFor="caption">Caption</label>
              <input
                type="text"
                name="caption"
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="border border-gray-300 shadow-md rounded-md p-2 mb-4 w-full"
              />

              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-600 text-sm font-bold">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                className="text-sm bg-purple-600 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-full"
                onClick={updateEditPost}
              >
                Update Post
              </button>
            </form>
          </div>
        )}


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
                        onClick={() => setEditPostId(post._id)}
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

      {posts.length === 0 && !loading && <p>No posts available.</p>}

      {loading && <div className="lds-circle"><div></div></div>}
    </div>
  );
}

