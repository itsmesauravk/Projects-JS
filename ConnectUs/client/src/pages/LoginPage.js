
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import '../App.css'



const localhost = "http://localhost:4000"

export default function LoginPage({mode}) {  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect,setRedirect] = useState(false)
    const [loading,setLoading] = useState(false)
    // const [userId,setUserId] = useState("")
    const {setUserInfo} = useContext(UserContext)

    const [emptyError,setEmptyError] = useState(false)
    const [invalidCredentials,setInvalidCredentials] = useState(false)
    const [otherError,setOtherError] = useState(false)

    function loginUser(ev) {
        ev.preventDefault();
        setLoading(true);
        setEmptyError(false);
        setInvalidCredentials(false);
        setOtherError(false);
    
        // Check for empty email or password
        if (!email || !password) {
            setLoading(false);
            // alert("Please enter both email and password.");
            setEmptyError(true);
            return;
        }
    
        fetch(`${localhost}/login`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        }).then((res) => {
            if (res.status === 200) {
                console.log("User Login");
                res.json().then((data) => {
                    setRedirect(true);
                    setUserInfo(data);
                });
            } else {
                // alert("Invalid email or password");
                setInvalidCredentials(true);
                redirect(false);
            }
        }).catch((error) => {
            console.error("Error during login:", error);
            // alert("An error occurred during login. Please try again.");
            setOtherError(true);
        }).finally(() => {
            setLoading(false);
        });
    }
    
    
    if (redirect) {
        return <Navigate to={`/home`} />;
      }
    


    return (
        <div className={`mt-10 ml-10 h-screen`}>
            <h1 className="text-2xl">LoginPage</h1>
            <form className="mt-10" onSubmit={loginUser}>
                <label className="block">
                    Email:
                </label>
                <input
                    className={`block border-2 border-blue-500 rounded-md p-1 ${mode === 'light' ? 'light-theme' : 'dark-theme'}`}
                    type="text"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />


                <label className="block mt-2">
                    Password:
                </label>
                <input className={`block border-2 border-blue-500 rounded-md p-1 ${mode === 'light' ? 'light-theme' : 'dark-theme'}`}
                type="password" 
                name="password"
                value ={password}
                onChange={(event) => setPassword(event.target.value)}
                />

                {emptyError && <p className="text-red-600">Please enter both email and password.</p>}
                {invalidCredentials && <p className="text-red-600">Invalid email or password.</p>}
                {otherError && <p className="text-red-600">An error occurred during login. Please try again.</p>}

                {loading && <div className="lds-circle"><div></div></div>}
                {!loading && <button className="mt-4 bg-blue-500 text-white p-1 rounded-md" type="submit">Login</button>}
            </form>

            <div className="mt-4">
                <p>Don't have account?  <Link className="text-red-600 underline" to="/registration">Create</Link> </p>
            </div>

        </div>
    );
}