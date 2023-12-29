import React from "react"


export default function LoginPage(){
    return(
        <div>
            <h2> Login here !!</h2>
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