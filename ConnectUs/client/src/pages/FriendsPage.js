import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

const url = "http://localhost:4000";

export default function FriendsPage() {
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [senderIds, setSenderIds] = useState([]);
  const [senderData, setSenderData] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await axios.get(`${url}/notification/${userInfo.id}`);
        setNotificationData(response.data);
        // Extract senderIds from notificationData
        const ids = response.data.map((notification) => notification.senderId);
        setSenderIds(ids);
      } catch (error) {
        console.log("Error getting friends: ", error);
      }
    };
    getFriends();
  }, [userInfo.id]);

  useEffect(() => {
    const getSenderData = async () => {
      try {
        if (senderIds.length > 0) {
          const response = await axios.post(`${url}/senderinfo`, {
            senderIds: senderIds,
          });
          setSenderData(response.data);
        }
      } catch (error) {
        console.log("Error getting sender data: ", error);
      }
    };

    // Call getSenderData whenever senderIds change
    getSenderData();
  }, [senderIds]);

  if (redirect) {
    return <Navigate to="/home" />;
  }

  console.log("noti", notificationData);
  console.log("sender", senderData);

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
        {notificationData.map((notification) => {
          return (
            <div key={notification._id}>
              <div>
                <h1>{notification.senderId}</h1>
                <h1>{notification.content}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
