import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import '../App.css';

export default function InspectUserPage({mode}) {
    const [loading, setLoading] = useState(false);
    const { userId } = useParams(); // Use destructuring to get the userId from params
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const url = "http://localhost:4000";

        const getUsersPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${url}/yourpost/${userId}`);
                // console.log("data: ", response.user);
                setUserData(response.data[0].user);
                setUserPosts(response.data);
                

            } catch (error) {
                console.log("Error getting users posts: ", error);
            } finally {
                setLoading(false);
            }
        };

        getUsersPosts();
    }, [userId]); // Add userId as a dependency to useEffect

    // const defaultMaleImage = "https://www.w3schools.com/howto/img_avatar.png";
    // const defaultFemaleImage = "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png";
    // const defaultCustomImage = "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg";


    const imageLink = "http://localhost:4000/"
    // const blueTick = "https://upload.wikimedia.org/wikipedia/commons/3/32/Verified-badge.png";
    // const goldTick = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Twitter_Verified_Badge_Gold.svg/2048px-Twitter_Verified_Badge_Gold.svg.png";
    console.log("user: ", userData);
    console.log("userPosts: ", userPosts);

    if (redirect) {
        return <Navigate to="/home/users" />;
    }
    return (
        <div className="mt-5 min-h-screen">
          {loading && <div className="lds-circle"><div></div></div>}
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setRedirect(true)}
          >
            Back
          </button>
          <h1 className="font-bold text-2xl mt-5">{userData?.firstName}'s Profile :</h1>
    
          <div>
            {!userPosts && <p>User have no Post uploaded !!</p>}
            {userPosts.map((post) => (
              <div key={post._id} className={`flex flex-col gap-5 mt-3 mb-3 p-2.5 border-2 rounded-md `}>
                <div class={`bg-white shadow-lg rounded-md p-4 mb-6 ${mode === 'light'?'light-theme':'dark-theme'}`}>
                    <div class="flex items-center mb-4">
                        <img
                        class="w-16 h-16 rounded-full object-cover mr-4"
                        src={imageLink + post.user.profileImage}
                        alt="profile"
                        />
                        <div>
                        <h1 class="text-xl font-bold">{post.user.firstName} {post.user.surname}</h1>
                        <p class="text-gray-600">{post.user.email}</p>
                        </div>
                    </div>
                    <p class="text-lg mb-4">{post.caption}</p>
                    <img
                        class="rounded-md w-full h-150"
                        src={imageLink + post.image}
                        alt="post image"
                    />
                    </div>
              </div>
            ))}
          </div>
        </div>
      );
    
}
