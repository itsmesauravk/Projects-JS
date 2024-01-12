import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function RegistrationPage() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [vipToken, setVipToken] = useState("");

  const [redirect,setRedirect] = useState(false)
  const [loading,setLoading] = useState(false)

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };


    function registerUser(ev) {
      ev.preventDefault();
      setLoading(true);
    
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("surname", surname);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("selectedGender", selectedGender);
      formData.append("profileImage", selectedImage); // Assuming selectedImage is a file object
      formData.append("vipToken", vipToken);
    
      fetch("http://localhost:4000/register", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(`User not Created. Server responded with status ${res.status}`);
          }
        })
        .then((data) => {
          console.log("User Created", data);
          setLoading(false);
          setRedirect(true);
        })
        .catch((error) => {
          console.error("Error:", error.message);
          setLoading(false);
          alert("Registration failed. Please try again.");
        });
    }
  
  if(redirect){
    return <Navigate to="/login" />
  }

  return (
    <div className="login mt-10 ml-10">
      <h1 className="text-2xl">Create New Account</h1>
      {/* encType="multipart/form-data" */}
      <form className="mt-10" onSubmit={registerUser}  encType="multipart/form-data">   
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

        <label className="block mt-2">Email:</label>
        <input
          className="block border-2 border-blue-500 rounded-md p-1"
          type="text"
          placeholder="Email or Phone Number "
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label className="block mt-2">Password:</label>
        <input
          className="block border-2 border-blue-500 rounded-md p-1"
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <label className="block mt-2">Date of Birth:</label>
        <input
          className="block border-2 border-blue-500 rounded-md p-1"
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(event) => setDateOfBirth(event.target.value)}
        />

        <label className="block mt-2">Gender:</label>
        <label className="block">
          <input
            type="radio"
            value="male"
            checked={selectedGender === 'male'}
            onChange={handleGenderChange}
          />
          Male
        </label>

        <label className="block">
          <input
            type="radio"
            value="female"
            checked={selectedGender === 'female'}
            onChange={handleGenderChange}
          />
          Female
        </label>

        <label className="block">
          <input
            type="radio"
            value="custom"
            checked={selectedGender === 'custom'}
            onChange={handleGenderChange}
          />
          Custom
        </label>

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
          name="profileImage"
          onChange={(event) => {
            const file = event.target.files[0];
            setSelectedImage(file);
          }}
        />

        <div className="mt-5">
          <p className="text-gray-600 italic mb-2">Only if you have :</p>
          <label>VIP TOKEN :</label>
          <input
            className="border-2 border-purple-800 rounded-md p-1 ml-2 capitalize"
            type="password"
            placeholder="VIP Token..."
            value={vipToken}
            onChange={(event) => setVipToken(event.target.value)}
          />
        </div>

        </div>
        {loading &&
          <div className="lds-circle"><div></div></div>
        }
        {!loading &&
          <button
          className=" block bg-blue-600 text-white rounded-md p-2 mt-3 hover:bg-blue-500"
          type="submit"
          value="Submit"
          onClick={registerUser}>
          Register
        </button>
        }


       
      </form>

      <div className="mt-4">
        <p>
          Already have an account?{" "}
          <Link className="text-blue-600 underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
