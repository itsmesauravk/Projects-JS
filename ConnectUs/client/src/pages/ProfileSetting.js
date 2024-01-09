import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function ProfileSetting(){
    const { userInfo } = useContext(UserContext)
    const{setUserInfo} = useContext(UserContext)
    const userId = userInfo.id;

    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const [updateRedirect,setUpdateRedirect] = useState(false)
    const [redirect,setRedirect] = useState(false)
    const [loading,setLoading] = useState(false)

    const updateProfile = (ev) => {
        ev.preventDefault();
        setLoading(true)
        fetch(`http://localhost:4000/profilesetting/${userId}`, {
          method: "PATCH",
          body: JSON.stringify({
            firstName: firstName,
            surname: surname,
            dateOfBirth: dateOfBirth,
            profileImage: selectedImage,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.status === 200) {
            console.log("User Updated");
            setLoading(false)
            setUpdateRedirect(true)
            console.log(res)
            setUserInfo({
                id:userId,
                email:userInfo.email,
                firstName:firstName,
                surname:surname,
                gender:userInfo.gender,
                profileImage:userInfo.profileImage
            })
          } else {
            alert("User not Updated");
          }
          
        });
    }

    if(updateRedirect){
        return <Navigate to={`/yourpost/${userId}`}/>
     }


    // deleting account 
    const deleteAccount = () =>{
        const conformation = window.confirm("Are you sure you want to delete your account?");
        if(conformation){
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
        else{
            alert("User not Delete");
        }
    }
    if(redirect){
        return <Navigate to="/login" />
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
                    <form className="mt-10" onSubmit={updateProfile}> 
            <input
          className="border-2 border-blue-500 rounded-md p-1"
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <input
          className="border-2 border-blue-500 rounded-md p-1 ml-2"
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
        />
        <label className="block mt-2">Date of Birth:</label>
        <input
          className="block border-2 border-blue-500 rounded-md p-1"
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(event) => setDateOfBirth(event.target.value)}
        />


        {/* for image */}
        <div className="mt-4 mb-2">
          <h1>Upload Profile Image :</h1>

          {selectedImage && (
      <div>
        <img
          alt="not found"
          width={"250px"}
          src={URL.createObjectURL(selectedImage)}
        />
        <br />
        <button onClick={() => setSelectedImage(null)}>Remove</button>
      </div>
    )}
    <input
      type="file"
      name="myImage"
      onChange={(event) => {
        const file = event.target.files[0];
        console.log(file);
        setSelectedImage(file.name);
      }}
    />
        </div>
        {loading &&
          <div className="lds-circle"><div></div></div>
        }
        {!loading &&
          <button
          className=" block bg-blue-500 text-white rounded-full p-2 mt-3 hover:bg-blue-600"
          type="submit"
          value="Submit"
          >
          Update Profile
        </button>
        }
       
      </form>
                </div>
                <div>
                    <h1>For password update</h1>
                </div>

                <div className="mt-10 mb-10">
                    <p>----------- OR ----------</p>
                </div>
                
                {/* delete account */}
                <div className="mt-10">
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