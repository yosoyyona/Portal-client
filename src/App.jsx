import './App.css'
import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import QuizPage from './pages/QuizPage';
import UserPage from './pages/UserPage';

import Error from './components/Error'

function App() {
  
  const [error, setError] = useState(null)

  return (
    <div className="App">
    <Navbar />

    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/posts' element={<PostPage />} />
      <Route path='/quiz' element={<QuizPage />} />
      <Route path='/signup' element={<IsAnon> <SignupPage /> </IsAnon>} />
      <Route path='/login' element={<IsAnon> <LoginPage /> </IsAnon>} />
      <Route path='/:userId' element={<IsPrivate> <UserPage /> </IsPrivate>} />
    </Routes>
    
      {
        error && <Error error={error} />
      }

    </div>
  )
}

export default App
