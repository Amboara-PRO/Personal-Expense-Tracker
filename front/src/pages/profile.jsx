import React from "react";
import Layout from "../components/layout";
import { useState, useEffect, useContext } from "react";
import { profileContext } from "../context/profileContext.jsx";
export default function Profile() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [onSettings, setOnSettings] = useState(false);
  const { profile ,handleUpdateProfile, handleDeleteProfile } = useContext(profileContext);

  const onUpdateProfile = async () => {
    const data = await handleUpdateProfile(password,name);
    if (data.err) {
      setError(data.err);
      setSuccess("");
      setTimeout(() => setError(""), 4000);
    } else if (data.success) {
      setSuccess(data.success);
      setError("");
      setPassword("");
      setName("");
      setTimeout(() => setSuccess(""), 4000);
    } else {
      setError("Unknown response");
      setSuccess("");
      setTimeout(() => setError(""), 4000);
    }
  };

    const onDeleteProfile = async () => {
      const data = await handleDeleteProfile();
      if (data.err) {
        setError(data.err);
        setSuccess("");
        setTimeout(() => setError(""), 4000);
      } else if (data.success) {
        setSuccess(data.success);
        setError("");
        setPassword("");
        setName("");
        setTimeout(() => setSuccess(""), 4000);
      } else {
        setError("Unknown response");
        setSuccess("");
        setTimeout(() => setError(""), 4000);
      }
    };
  return (
    <Layout className="flex flex-col items-center text-center justify-center min-h-screen bg-gray-100 w-full">
    <div className="flex flex-col items-center text-center w-full h-full p-6">
      <h1 className="text-5xl font-semibold mb-4">User Profile</h1>
      {
        profile ? (
          onSettings ? (
            <div className="flex flex-col items-center justify-between w-full h-full">

          <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md w-full h-full">
            {error && <div className="mb-4 text-red-500">{error}</div>}
            {success && <div className="mb-4 text-green-500">{success}</div>}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>  
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={profile.name || "Enter new name"}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <button
              onClick={async() => {await onUpdateProfile();setOnSettings(false);}}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
            >
              Update Profile
            </button>
            <button
              onClick={() => {setOnSettings(false);setPassword("");setName("");setError("");setSuccess("");}}
              className="w-full mt-4 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </form>
            <button
              onClick={() => {setOnSettings(false);onDeleteProfile();}}
              className="w-1/2 mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
            >
              Delete Profile
            </button>
            </div>
        ) : (
          <div className="flex flex-col justify-evenly w-full h-full items-center">
            <div className="flex flex-col justify-evenly w-1/2 h-full items-center bg-white p-6 rounded-lg shadow-md">
            <section>
              <h2 className="font-bold text-2xl">Name</h2>
              <p className="font-semibold">{(profile.name||"None")}</p>
            </section>
            <section>
              <h2 className="font-bold text-2xl">Email</h2>
              <p className="font-semibold">{profile.email}</p>
            </section>
            <section>
              <h2 className="font-bold text-2xl">Creation Date</h2>
              <p className="font-semibold">{new Date(profile.creationDate).toLocaleDateString()}</p>
            </section>

            </div>
            <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition w-1/2"
            onClick={() => setOnSettings(true)}>
              Settings
            </button>
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
        )

        ):(
          <p className="text-gray-600">Loading profile...</p>
        )
            
      }
    </div>
    </Layout>
  );
}