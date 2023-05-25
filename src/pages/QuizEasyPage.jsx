import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import Quiz from '../components/Quiz'
import { Pane, Button, Alert } from 'evergreen-ui'
import axios from 'axios'

function QuizEasyPage() {
  
  const [quiz, setQuiz] = useState([])
  const { isLoggedIn } = useContext(AuthContext);
  
  const API_URL = "https://vast-jade-woodpecker-sock.cyclic.app";
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${API_URL}/quizzes/difficulty/easy`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      setQuiz(response.data)
    })
    .catch((error) => console.log(error))
  }, [])


  return (
    <div>
      <Pane display="flex" padding={16} marginLeft="3rem" marginRight="3rem">
        <Pane flex={1} alignItems="center" display="flex">
          <Link to='/quizzes'><Button size="small" appearance="primary">Back</Button></Link>
        </Pane>
        <Pane>
          {isLoggedIn && 
            <Link to='/quizzes/create'><Button size="small">Create a quiz!</Button> </Link>
          }
        </Pane>
      </Pane>
      
      <div id="quiz-list" >
        <Quiz key={quiz._id} quiz={quiz} />
      </div>

      <Pane flex={1} alignItems="center" display="flex" justifyContent='center' marginTop={5} >
        <Link to='/quizzes/difficulty/intermediate'><Button size="small" color="info" marginRight="8px">Intermediate</Button></Link>
        <Link to='/quizzes/difficulty/hard'><Button size="small" intent="danger">Hard</Button></Link>
      </Pane>

    </div>
  )
}

export default QuizEasyPage