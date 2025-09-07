import { getProfile,updateProfile,deleteProfile } from "../api/profile";
import { createContext, useState, useEffect } from "react";

export const profileContext = createContext();
export default function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
    useEffect(() => {
    const fetchProfile = async () => {
      try{
        const data = await getProfile();
        if (data && !data.message) {
          setProfile(data);
        } else {
          setProfile(null);
        }
        }catch(error){
            setProfile(null);
            return {err: "Something went wrong"}
        }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (password,name) => {
    try {
      const data = await updateProfile(password,name);
          if(password.length > 100){
    return { err: "Password too long" };
  }
        if (data.error || data.err) {
            return { err: data.error || data.err };
        }
        setProfile(data.user);
        return { success: "Profile updated", data: data.user };
    }
    catch (error) {
        return { err: "Something went wrong" };
    }
    };
    const handleDeleteProfile = async () => {
        try {
            const data = await deleteProfile();
            if (data.error || data.err) {
                return { err: data.error || data.err };
            }
            setProfile(null);
            localStorage.removeItem("token");
            window.location.reload(); 
            return { success: "Profile deleted" };
        }
        catch (error) {
            return { err: "Something went wrong" };
        }
    };

  return (
    <profileContext.Provider value={{ profile, handleUpdateProfile, handleDeleteProfile }}>
      {children}
    </profileContext.Provider>
  );
}