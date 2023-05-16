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
import PostCreatePage from './pages/PostCreatePage';
import PostDetailsPage from './pages/PostDetailsPage';
import PostEditPage from './pages/PostEditPage';

import QuizPage from './pages/QuizPage';
import QuizCreatePage from './pages/QuizCreatePage';

import UserPage from './pages/UserPage';
import UserEditPage from './pages/UserEditPage';

import Error from './components/Error'

function App() {
  
  const [error, setError] = useState(null)

  return (
    <div className="App">
    <Navbar />

    <Routes>
      <Route path='/' element={<HomePage />} />
      
      <Route path='/posts' element={<PostPage />} />
      <Route path='/posts/create' element={<PostCreatePage />} />
      <Route path='/posts/:postId' element={<PostDetailsPage />} />
      <Route path='/posts/:postId/edit' element={<PostEditPage />} />

      <Route path='/quizzes' element={<QuizPage />} />
      <Route path='/quizzes/create' element={<QuizCreatePage />} />

      <Route path='/signup' element={<IsAnon> <SignupPage /> </IsAnon>} />
      <Route path='/login' element={<IsAnon> <LoginPage /> </IsAnon>} />
      <Route path='/user/:userId' element={<IsPrivate> <UserPage /> </IsPrivate>} />
      <Route path='/user/:userId/edit' element={<IsPrivate> <UserEditPage /> </IsPrivate>} />
    </Routes>
    
      {
        error && <Error error={error} />
      }

    </div>
  )
}

export default App
