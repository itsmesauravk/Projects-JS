import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../userContex"

export default function HomePage() {
  const { userInfo, setUserInfo } = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/profile", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Handle the error, e.g., show an error message to the user
      }
    };

    fetchData();
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:3001/logout", {
      credentials: "include",
      method: "POST",
    })
    .then(() => setUserInfo(null))
    .catch((error) => console.error("Error logging out:", error));
  }

  const username = userInfo?.username;
  const id = userInfo?.id;
  const picture = userInfo?.picture;

  return (
    <>
      <header className="flex gap-80 align-center justify-center m-8 border-2 rounded-md">
        <Link to="/" className="font-bold text-red-700 text-2xl">
          My<span className="text-blue-500">Page</span>
        </Link>
        <nav className="flex gap-3">
          {username && (
            <>
              <Link to="/profile" className="hover:text-green-700 font-bold">
                Profile
              </Link>
              <a
                className="hover:text-green-700 font-bold"
                onClick={logout}
                href="#logout"
              >
                Logout
              </a>
            </>
          )}
          {!username && (
            <>
              <Link className="hover:text-green-700 font-bold" to="/login">
                Login
              </Link>
              <br />
              <Link className="hover:text-green-700 font-bold" to="/register">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
      <div className="ml-10">
        {username ? (
          <div>
            <h1 className="font-bold text-pink-900 text-2xl">Welcome {username} ,</h1>
            <h3>Your db id: {id}</h3>
            <div className="w-20px h-20px mt-20">
              {picture ? (
                <img
                  className="w-20px h-20px rounded-full"
                  src={picture}
                  alt="image"
                />
              ) : (
                <img
                  className="w-20px h-20px rounded-full"
                  src="https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                  alt="image"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="ml-10">
            <h1>Hello Pretty Soul *_* </h1>
          </div>
        )}
      </div>
    </>
  );
}
