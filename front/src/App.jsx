import { useState } from 'react'
import './App.css'
import './index.css'
import  Auth  from './components/auth.jsx'
import  AuthProvider  from './context/authContext.jsx'
function App() {
  return (
    <>
    <AuthProvider>
      <Auth />
    </AuthProvider>
    </>
  )
}

export default App
