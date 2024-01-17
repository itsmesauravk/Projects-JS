import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

const url = "http://localhost:4000";

export default function FriendsPage() {
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [senderId, setSenderId] = useState(null);
  const [senderData, setSenderData] = useState(null);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await axios.get(`${url}/notification/${userInfo.id}`);
        setNotificationData(response.data);
      } catch (error) {
        console.log("Error getting friends: ", error);
      }
    };
    getFriends();
  }, [userInfo.id]);

  useEffect(() => {
    // Check if there are new notifications and set senderId accordingly
    if (notificationData.length > 0) {
      setSenderId(notificationData[0].senderId);
    }
  }, [notificationData]);

  useEffect(() => {
    const getSenderData = async () => {
      try {
        if (senderId !== null) {
          const response = await axios.get(`${url}/senderinfo/${senderId}`);
          setSenderData(response.data);
        }
      } catch (error) {
        console.log("Error getting sender info: ", error);
      }
    };
    getSenderData();
  }, [senderId]);

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <div>
        <button
          onClick={() => setRedirect(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Home
        </button>
      </div>

      <h1>Friends Page</h1>
      <div>
        {notificationData.map((notification) => (
          <div key={notification._id}>
            <div>
              <h1>{notification.senderId}</h1>
              {/* No need for the button here */}
              <h1>{notification.content}</h1>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2>Sender Information:</h2>
        {senderData && (
          <div>
            <p>Sender Name: {senderData.name}</p>
            {/* Add more fields as needed */}
          </div>
        )}
      </div>
    </div>
  );
}
