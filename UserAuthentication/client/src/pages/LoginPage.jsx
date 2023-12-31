import React from "react"


export default function LoginPage(){
    React.useEffect(()=>{
        
    })
    return(
        <div>

            <h2> Login here !!</h2>
            {/* Form to login */}   
            <form action="submit">
                <label >Username</label>
                <input type="text" />

                <label >Password</label>
                <input type="password" />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}