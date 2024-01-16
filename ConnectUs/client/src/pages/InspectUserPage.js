import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import '../App.css';
import { UserContext } from "../UserContext";

export default function InspectUserPage({ mode }) {
    const { userInfo } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const ownerId = userInfo.id;

    const url = "http://localhost:4000";

    // Function to handle adding a friend
    const addFriend = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${url}/addFriend`, {
                senderId: ownerId,
                receiverId: userId,
            });
            console.log("response: ", response);
        } catch (error) {
            console.log("Error adding friend: ", error.response || error.message || error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getUsersPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${url}/yourpost/${userId}`);
                setUserData(response.data[0].user);
                setUserPosts(response.data);
            } catch (error) {
                console.log("Error getting users posts: ", error);
            } finally {
                setLoading(false);
            }
        };

        getUsersPosts();
    }, [userId]);

    const imageLink = "http://localhost:4000/";
    const blueTick = "https://upload.wikimedia.org/wikipedia/commons/3/32/Verified-badge.png";
    const goldTick = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Twitter_Verified_Badge_Gold.svg/2048px-Twitter_Verified_Badge_Gold.svg.png";

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

            {!userData && <p className="font-bold text-2xl mt-10">User has no posts uploaded!!</p>}

            {userData && (
                <div>
                    <h1 className="font-bold text-2xl mt-5">{userData?.firstName}'s Profile :</h1>

                    <div className="mt-5 mb-5">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={addFriend} 
                        >
                            Add Friend
                        </button>
                    </div>

                    <div>
                        {userPosts.map((post) => (
                            <div key={post._id} className={`flex flex-col gap-5 mt-3 mb-3 p-2.5 border-2 rounded-md `}>
                                <div class={`bg-white shadow-lg rounded-md p-4 mb-6 ${mode === 'light' ? 'light-theme' : 'dark-theme'}`}>
                                    <div class="flex items-center mb-4">
                                        <img
                                            class="w-16 h-16 rounded-full object-cover mr-4"
                                            src={imageLink + post.user.profileImage}
                                            alt="profile"
                                        />
                                        <div>
                                            <div className="flex gap-2">
                                                <h1 class="text-xl font-bold">{post.user.firstName} {post.user.surname}</h1>
                                                {post.user.vipToken === "iamgold" && <img src={goldTick} alt="gold" className="w-6 h-6" />}
                                                {post.user.vipToken === "skyisblue" && <img src={blueTick} alt="blue" className="w-6 h-6" />}
                                            </div>
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
            )}
        </div>
    );
}
