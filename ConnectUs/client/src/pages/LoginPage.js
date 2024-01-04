
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";


const localhost = "http://localhost:4000"

export default function LoginPage() {  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect,setRedirect] = useState(false)
    const [loading,setLoading] = useState(false)
    const [userId,setUserId] = useState("")
    const {setUserInfo} = useContext(UserContext)

    function loginUser(ev) {
        ev.preventDefault();
        setLoading(true)
        fetch(`${localhost}/login`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials:'include'
        }).then((res) => {
            if (res.status === 200) {
                console.log("User Login");
                
            
            } else {
                alert("User not Login");
            }
            res.json().then((data) => {
                setLoading(false)
                setRedirect(true)
                setUserInfo(data)
                setUserId(data._id)
                console.log(userId)
            })
        });
    }
    
    if (redirect) {
        return <Navigate to={`/home/${userId}`} />;
      }
      
    


    return (
        <div className="login mt-10 ml-10">
            <h1 className="text-2xl">LoginPage</h1>
            <form className="mt-10" onSubmit={loginUser}>
                <label className="block">
                    Email:
                </label>
                <input className=" block border-2 border-blue-500 rounded-md p-1"
                 type="text" 
                 name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                 />
                <label className="block mt-2">
                    Password:
                </label>
                <input className="block border-2 border-blue-500 rounded-md p-1 " 
                type="password" 
                name="password"
                value ={password}
                onChange={(event) => setPassword(event.target.value)}
                />
                {loading && <div class="lds-circle"><div></div></div>}
                {!loading && <button className="mt-4 bg-blue-500 text-white p-1 rounded-md" type="submit">Login</button>}
            </form>

            <div className="mt-4">
                <p>Don't have account?  <Link className="text-red-600 underline" to="/registration">Create</Link> </p>
            </div>

        </div>
    );
}