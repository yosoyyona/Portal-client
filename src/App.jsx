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
import QuizEditPage from './pages/QuizEditPage';
import QuizSelectPage from './pages/QuizSelectPage';
import QuizListPage from './pages/QuizListPage';
import QuizRandomPage from './pages/QuizRandomPage';
import QuizEasyPage from './pages/QuizEasyPage';
import QuizIntermediatePage from './pages/QuizIntermediatePage';
import QuizHardPage from './pages/QuizHardPage';

import SearchPage from './pages/SearchPage';

import UserPage from './pages/UserPage';
import UserEditPage from './pages/UserEditPage';

import ErrorPage from './pages/ErrorPage'
import AboutPage from './pages/AboutPage'
import Error from './components/Error'

function App() {
  
  const [error, setError] = useState(null)

  return (
    <div className="App">
    <Navbar />

    <Routes>
      <Route path='/' element={<HomePage />} />
      
      <Route path='/posts' element={<IsPrivate> <PostPage /> </IsPrivate>} />
      <Route path='/posts/create' element={<IsPrivate> <PostCreatePage /> </IsPrivate>} />
      <Route path='/posts/:postId' element={<IsPrivate> <PostDetailsPage /> </IsPrivate>} />
      <Route path='/posts/:postId/edit' element={<IsPrivate> <PostEditPage /> </IsPrivate>} />

      <Route path='/quizzes' element={<QuizSelectPage />} />
      <Route path='/quizzes/create' element={<IsPrivate> <QuizCreatePage /> </IsPrivate>} />
      <Route path='/quizzes/all' element={<IsPrivate> <QuizListPage /> </IsPrivate>} />
      <Route path='/quizzes/random' element={<IsPrivate> <QuizRandomPage /> </IsPrivate>} />
      <Route path='/quizzes/:quizId' element={<IsPrivate> <QuizPage /> </IsPrivate>} />
      <Route path='/quizzes/:quizId/edit'element={<IsPrivate> <QuizEditPage /> </IsPrivate>} />
      
      <Route path='/quizzes/difficulty/easy' element={<IsPrivate> <QuizEasyPage /> </IsPrivate>} />
      <Route path='/quizzes/difficulty/intermediate' element={<IsPrivate> <QuizIntermediatePage /> </IsPrivate>} />
      <Route path='/quizzes/difficulty/hard' element={<IsPrivate> <QuizHardPage /> </IsPrivate>}  />
      
      <Route path='/search' element={<SearchPage />} />

      <Route path='/signup' element={<IsAnon> <SignupPage /> </IsAnon>} />
      <Route path='/login' element={<IsAnon> <LoginPage /> </IsAnon>} />
      <Route path='/user/:userId' element={<IsPrivate> <UserPage /> </IsPrivate>} />
      <Route path='/user/:userId/edit' element={<IsPrivate> <UserEditPage /> </IsPrivate>} />

      <Route path='/about' element={<AboutPage />} />
      <Route path="*" element={ <ErrorPage /> } />
    </Routes>
    
      {
        error && <Error error={error} />
      }

    </div>
  )
}

export default App
