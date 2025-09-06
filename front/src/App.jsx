import './App.css'
import './index.css'
import  Auth  from './components/auth.jsx'
import  AuthProvider  from './context/authContext.jsx'
import { useContext } from 'react'
import { AuthContext as authContext } from './context/authContext.jsx'
import Dashboard from './pages/dashboard.jsx'

function AppContent() {
  const { user } = useContext(authContext); 

  return (
    <>
      {user ? <Dashboard /> : <Auth />} 
    </>
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
