// import { createContext, useState, useEffect } from "react";
// import { login, signup, getMe } from "../api/auth";


// export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const data = await getMe();
//         if (data && !data.message) {
//           setUser(data);
//         } else {
//           setUser(null);
//           localStorage.removeItem("token");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setUser(null);
//         localStorage.removeItem("token");
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         return { err: "Email and password are required" };
//       }

//       const data = await login(email, password);

//       if (!data || !data.token) {
//         return { err: "Invalid credentials" };
//       }

//       localStorage.setItem("token", data.token); // Stocker le token
//       const me = await getMe();
//       setUser(me);

//       return { success: "Login successful", data: me };
//     } catch (error) {
//       console.error("Error during login:", error);
//       return { err: "Something went wrong" };
//     }
//   };

//   const handleSignup = async (email, password) => {
//     try {
//       if (!email || !password) {
//         return { err: "Email and password are required" };
//       }

//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         return { err: "Invalid email address" };
//       }

//       if (password.length > 100 || email.length > 100) {
//         return { err: "Email or password too long" };
//       }

//       const data = await signup(email, password);

//       if (!data || data.error || data.err) {
//         return { err: data.error || data.err || "Signup failed" };
//       }

//       return { success: "Signup successful", data };
//     } catch (error) {
//       console.error("Error during signup:", error);
//       return { err: "Something went wrong" };
//     }
//   };

//   const handleLogout = () => {
//     try {
//       localStorage.removeItem("token");
//       setUser(null);
//       return { success: "Logout successful" };
//     } catch (error) {
//       console.error("Error during logout:", error);
//       return { err: "Something went wrong" };
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, handleLogin, handleSignup, handleLogout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
import { createContext, useState, useEffect, useContext } from "react";
import { login, signup, getMe } from "../api/auth";

// Création du contexte
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        if (data && !data.message) {
          setUser(data);
        } else {
          setUser(null);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        localStorage.removeItem("token");
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      if (!email || !password) return { err: "Email and password are required" };
      const data = await login(email, password);
      if (!data || !data.token) return { err: "Invalid credentials" };

      localStorage.setItem("token", data.token);
      const me = await getMe();
      setUser(me);
      return { success: "Login successful", data: me };
    } catch (error) {
      console.error("Error during login:", error);
      return { err: "Something went wrong" };
    }
  };

  const handleSignup = async (email, password) => {
    try {
      if (!email || !password) return { err: "Email and password are required" };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { err: "Invalid email address" };
      if (password.length > 100 || email.length > 100) return { err: "Email or password too long" };

      const data = await signup(email, password);
      if (!data || data.error || data.err) return { err: data.error || data.err || "Signup failed" };

      return { success: "Signup successful", data };
    } catch (error) {
      console.error("Error during signup:", error);
      return { err: "Something went wrong" };
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      return { success: "Logout successful" };
    } catch (error) {
      console.error("Error during logout:", error);
      return { err: "Something went wrong" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleSignup, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé
export const useAuth = () => useContext(AuthContext);
