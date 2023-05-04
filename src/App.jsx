import './App.css'
import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

function App() {
  
  return (
    <div className="App">
    <Navbar />

    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>

    
    </div>
  )
}

export default App
