import { createContext, useState, useEffect } from "react";
import { login, signup, getMe } from "../api/auth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try{
        const data = await getMe();
        if (data && !data.message) {
          setUser(data);
        }
      }catch(error){
        setUser(null);
        localStorage.removeItem("token");
        return {err: "Something went wrong"}
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async (email, password) => {
  try {
    const data = await login(email, password);

    if (!data.token) {
      return { err: "Invalid credentials" };
    }

    const me = await getMe();
    setUser(me);

    return { success: "Login successful", data: me };
  } catch (error) {
    return { err: "Something went wrong" };
  }
};


  const handleSignup = async (email, password) => {
  try {
    if (email.length < 1 || password.length < 1) {
      return { err: "Email and password are required" };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { err: "Invalid email address" };
    }

    const data = await signup(email, password);

    if (data.error || data.err) {
      return { err: data.error || data.err };
    }

    return { success: "Signup successful", data };
  } catch (error) {
    return { err: "Something went wrong" };
  }
};



  const handleLogout = () => {
  try {
    localStorage.removeItem("token");
    setUser(null);
    return { success: "Logout successful" };
  } catch (error) {
    return { err: "Something went wrong" };
  }
};


  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleSignup, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
