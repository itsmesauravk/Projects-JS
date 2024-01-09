import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function ProfileSetting(){
    const { userInfo } = useContext(UserContext)
    const userId = userInfo.id;

    const [redirect,setRedirect] = useState(false)

    const deleteAccount = () =>{
        fetch(`http://localhost:4000/deleteaccount/${userId}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            if(res.status === 200){
                console.log("User Delete");
                alert("User Deleted sucessfully")
                setRedirect(true)
                
            }else{
                alert("User not Delete");
            }
        })
    }

    if(redirect){
       return <Navigate to="/"/>
    }

    return(
        <div>
            <div className="mt-4 mb-4">
                <button className="bg-purple-600 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-full flex items-center">
                    <Link to={`/home`}>Home</Link>
                </button>
            </div>
            <div>
                <h1 className="text-2xl font-bold">Profile Setting</h1>
                <div>
                    <h1>For profile update</h1>
                </div>
                <div>
                    <h1>For password update</h1>
                </div>
                
                {/* delete account */}
                <div className="mt-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 font-bold cursor-pointer"
                        onClick={deleteAccount}
                    >
                    Delete Account
                    </button>  
                </div>
            </div>
        </div>
    )
}