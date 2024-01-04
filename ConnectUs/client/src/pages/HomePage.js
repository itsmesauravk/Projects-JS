import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
          setPosts(data);
          setLoading(false);
          
          // Assuming you want to set user information to the first user in the array
          if (data.length > 0) {
            setUserInfo(data[0]);
          }
        } else {
          alert("Posts not found");
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }finally{
        setLoading(false);
      }
    }

    fetchPosts();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div>
      <h1>HomePage</h1>

      {loading && <div className="lds-circle"><div></div></div>}

      {/* Display fetched posts */}
      {userInfo && (
        <ul>
          <li style={{ border: '1px solid black', marginBottom: '5px' }}>
            {`Name: ${userInfo.firstName} ${userInfo.surname}, Email: ${userInfo.email}`}
          </li>
        </ul>
      )}
    </div>
  );
}
