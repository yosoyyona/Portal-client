import './App.css'
import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import QuizzPage from './pages/QuizzPage';

import Error from './components/Error'

function App() {
  
  const [error, setError] = useState(null)

  return (
    <div className="App">
    <Navbar />

    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/post' element={<PostPage />} />
      <Route path='/quizz' element={<QuizzPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
    
      {
        error && <Error error={error} />
      }

    </div>
  )
}

export default App
