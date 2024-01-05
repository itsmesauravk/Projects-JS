import { useContext, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";



const defaultMaleImage = "https://www.w3schools.com/howto/img_avatar.png";
const defaultFemaleImage = "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png";
const defaultCustomImage = "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg";

export default function HomeLayout(){
    const [redirect,setRedirect] = useState(false)
    const { userInfo,ready } = useContext(UserContext)

    

    function logout(){
        fetch("http://localhost:4000/logout",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            if(res.status === 200){
                console.log("User Logout");
                setRedirect(true)
                
            }else{
                alert("User not Logout");
            }
        })
    }
    
    

    if(redirect){
        return <Navigate to="/login"/>
    }
    if (!ready) {
        // Data is still being fetched, show loading state or return null
        return <p>Loading...</p>;
      }
    if (!userInfo) {
        // You can render a loading state or return null
        return null;
      }

    const {id,firstName,surname,email,gender,selectedImage} = userInfo;
    return(
        <div>
            <div className="mt-5">
                <div>
                    {selectedImage && <img src={selectedImage} alt="profile" className="w-20 h-20 rounded-full" />}
                    {!selectedImage && gender === 'male' &&
                        <img src={defaultMaleImage} alt="male-profile" className="w-20 h-20 rounded-full" />
                    }
                    {!selectedImage && gender === 'female' &&
                        <img src={defaultFemaleImage} alt="female-profile" className="w-20 h-20 rounded-full" />
                    }
                    {!selectedImage && gender === 'custom' &&
                        <img src={defaultCustomImage} alt="custom-profile" className="w-20 h-20 rounded-full" />
                    }
                </div>
                <div>
                    <h1 className="font-bold">{firstName} {surname}</h1>
                    <p className="text-sm italic text-blue-800 underline">{email}</p>
                </div>
            </div>
            <nav className="bg-blue-600 p-4 mt-6 rounded-md">
                <ul className="flex space-x-4 justify-around">
                    <li className="text-white font-bold hover:text-gray-300 cursor-pointer">
                        <Link to={'/home'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        </Link>

                        </li>

                    <li className="text-white font-bold hover:text-gray-300 cursor-pointer">
                        <Link to={`/newpost/${id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        </Link>

                        </li>

                    <li className="text-white font-bold hover:text-gray-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                        </li>

                    <li className="text-white font-bold hover:text-gray-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>

                        </li>

                    <li className="text-white font-bold hover:text-gray-300 cursor-pointer">
                    <Link to="/login" onClick={logout}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    
                    </Link>

                        </li>
                </ul>
            </nav>

            <Outlet />
        </div>
    )
}