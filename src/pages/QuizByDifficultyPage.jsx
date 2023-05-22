import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import Quiz from '../components/Quiz'
import { Pane, Button, Alert } from 'evergreen-ui'
import axios from 'axios'

function QuizByDifficultyPage() {
  
  const [quiz, setQuiz] = useState([])
  const { isLoggedIn } = useContext(AuthContext);
  
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${API_URL}/quizzes/easy`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      console.log(response.data)
      setQuiz(response.data)
    })
    .catch((error) => console.log(error))
  }, [])


  return (
    <div>
      <Pane display="flex" padding={16}>
        <Pane flex={1} alignItems="center" display="flex">
          <Link to='/'><Button size="small" appearance="primary">Back</Button></Link>
        </Pane>
        <Pane>
          {isLoggedIn && 
            <Link to='/quizzes/create'><Button size="small">Create a quiz!</Button> </Link>
          }
        </Pane>
      </Pane>
      
      <div id="quiz-list" >
        {quiz.map(quiz => <Quiz key={quiz._id} quiz={quiz} /> )}
      </div>
    </div>
  )
}

export default QuizByDifficultyPage