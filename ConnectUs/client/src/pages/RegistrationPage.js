import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RegistrationPage() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

 function registerUser(ev) {
    ev.preventDefault();
    fetch("http://localhost:3001/register", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        surname: surname,
        email: email,
        password: password,
        dateOfBirth: dateOfBirth,
        selectedGender: selectedGender,
        selectedImage: selectedImage,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        alert("User Created");
      } else {
        alert("User not Created");
      }
    });
  }

  return (
    <div className="login mt-10 ml-10">
      <h1 className="text-2xl">Create New Account</h1>
      <form className="mt-10" onSubmit={registerUser}>
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
      name="myImage"
      onChange={(event) => {
        const file = event.target.files[0];
        console.log(file);
        setSelectedImage(file.name);
      }}
    />

        </div>

        <button
          className=" block border-2 rounded-md p-2 mt-3 hover:border-blue-400"
          type="submit"
          value="Submit"
          onClick={registerUser}
        >
          Register
        </button>
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
