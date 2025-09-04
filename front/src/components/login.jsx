import React from "react";
export default function Login() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="w-full h-1/2 flex flex-col justify-between items-center">
                <h1>Login Account</h1>
                <form className="w-full h-1/2 flex flex-col justify-between items-center">
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                    </form>
            </div>
        </div>
    )
}