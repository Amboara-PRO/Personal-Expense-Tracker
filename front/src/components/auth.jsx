import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

export default function Auth() {
  const { user, handleLogin, handleSignup, handleLogout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
  };

  return (
    <div className="bg-gradient-to-br from-indigo-200 via-white to-teal-100 flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-md mb-10">
        Personal Expense Tracker
      </h1>

      <div className="bg-white shadow-xl rounded-2xl p-10 w-96 flex flex-col items-center">
        {user ? (
          <div className="flex flex-col gap-6 items-center justify-center w-full">
            <h1 className="text-3xl font-bold text-gray-700">Welcome</h1>
            <p className="text-lg font-medium text-gray-500">Connected as <span className="font-semibold text-gray-800">{user.email}</span></p>
            <button
              onClick={onLogout}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center w-full">
            <input
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="text-center border rounded-lg border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="text-center border rounded-lg border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="flex flex-row justify-between w-full gap-4">
              <button
                onClick={onLogin}
                className="flex-1 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition"
              >
                Login
              </button>
              <button
                onClick={onSignup}
                className="flex-1 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow-md transition"
              >
                Signup
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-6 px-6 py-3 bg-red-500 rounded-lg text-white font-semibold shadow-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 px-6 py-3 bg-green-500 rounded-lg text-white font-semibold shadow-md">
          {success}
        </div>
      )}
    </div>
  );
}
