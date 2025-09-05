import React, { useContext, useState } from "react";
import { AuthContext} from "../context/authContext";

export default function Auth() {
  const { user, handleLogin, handleSignup, handleLogout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success , setSuccess] = useState("");

  const onLogin = async () => {
    const data = await handleLogin(email, password);
    if (data.err) {
    setError(data.err);
    setSuccess("");
    setTimeout(() => setError(""), 4000);
  } else if (data.success) {
    setSuccess(data.success);
    setError("");
    setEmail("");
  setPassword("");
  setTimeout(() => setSuccess(""), 4000);
  } else {
    setError("Unknown response");
    setSuccess("");
    setTimeout(() => setError(""), 4000);
  }
  };

  const onSignup = async () => {
    const data = await handleSignup(email, password);
    if (data.err) {
    setError(data.err);
    setSuccess("");
    setTimeout(() => setError(""), 4000);
  } else if (data.success) {
    setSuccess(data.success);
    setError("");
    setEmail("");
  setPassword("");
  setTimeout(() => setSuccess(""), 4000);
  } else {
    setError("Unknown response");
    setSuccess("");
    setTimeout(() => setError(""), 4000);
  }
  };

  const onLogout = async () => {
    const data = await handleLogout();
    if (data.err) {
    setError(data.err);
    setSuccess("");
    setTimeout(() => setError(""), 4000);
  } else if (data.success) {
    setSuccess(data.success);
    setError("");
    setEmail("");
  setPassword("");
  setTimeout(() => setSuccess(""), 4000);
  } else {
    setError("Unknown response");
    setSuccess("");
    setTimeout(() => setError(""), 4000);
  }
  }

  return (
    <div className="text-center text-black flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-semibold">Personal expense tracker</h1>
      {user ? (
        <div className="flex flex-col gap-10 items-center justify-center w-1/2 h-1/2">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-xl font-semibold">Connected on {user.email}</p>
          <button onClick={onLogout} className="text-center border-2 rounded-lg border-black w-28">Logout</button>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 items-center justify-evenly w-1/2 h-1/2">
          <input value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} className="text-center border-2 rounded-sm border-black w-1/2 h-1/12"/>
          <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} className="text-center border-2 rounded-sm border-black w-1/2 h-1/12"
          />
          <div className="flex flex-row justify-between w-1/2">
            <button onClick={onLogin}className="text-center border-2 rounded-lg border-black w-28">Login</button>
            <button onClick={onSignup} className="text-center border-2 rounded-lg border-black w-28">Signup</button>
          </div>
        </div>
      )}
      {error && 
      <div className="flex flex-col items-center justify-center text-center w-1/4 h-10 bg-red-600 rounded-md text-white font-semibold">
        <p className="w-full text-center">{error}</p>
      </div>
      }
      {success && 
      <div className="flex flex-col items-center justify-center text-center w-1/4 h-10 bg-green-600 rounded-md text-white font-semibold">
        <p className="w-full text-center">{success}</p>
      </div>
      }
    </div>
  );
}
