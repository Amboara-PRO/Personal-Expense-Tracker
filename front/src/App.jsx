import './App.css'
import './index.css'
import  Auth  from './components/auth.jsx'
import  AuthProvider  from './context/authContext.jsx'
import { useContext } from 'react'
import { AuthContext as authContext } from './context/authContext.jsx'
import Dashboard from './pages/dashboard.jsx'
import { Route, Routes , Navigate} from 'react-router-dom'
import Profile from './pages/profile.jsx'
import ProfileProvider from './context/profileContext.jsx'
import Expenses from './pages/expenses.jsx';
function AppContent() {
  const { user } = useContext(authContext); 

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
           <Route 
            path="/profile" 
            element={
              <ProfileProvider>
                <Profile />
              </ProfileProvider>
            } 
          />
        </>
      ) : (
        <Route path="/" element={<Auth />} />
      )}
      <Route path="*" element={<Auth/>} />
    </Routes>
  );
}
function App() {
  return (
    <>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
    </>
  )
}

export default App
