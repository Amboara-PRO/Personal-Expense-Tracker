import { useState } from 'react'
import './App.css'
import './index.css'
import Login from './components/login.jsx'
const apiUrl = import.meta.env.VITE_API_URL;
function App() {
  return (
    <>
      <Login />
    </>
  )
}

export default App
