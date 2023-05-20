import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import Quiz from '../components/Quiz'
import { Pane, Button  } from 'evergreen-ui'
import axios from "axios";

const QuizRandomPage = () => {
  
  const [quiz, setQuiz] = useState([])
  const { isLoggedIn } = useContext(AuthContext);
  
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${API_URL}/quizzes/random`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => setQuiz(response.data))
    .catch((error) => console.log(error))
  }, [])

  return (
    <div>
      <Pane display="flex" padding={16}>
        <Pane flex={1} alignItems="center" display="flex">
          <Link to='/'><Button size="small" appearance="primary">Back</Button></Link>
        </Pane>
        <Pane>
          <Link to='/quizzes/random'><Button size="small" color="info" marginRight={3}>Get another!</Button></Link>
          {isLoggedIn && 
            <Link to='/quizzes/create'><Button size="small">Create a quiz!</Button> </Link>
          }
        </Pane>
      </Pane>
      
      <div id="random-quiz" >
        <Quiz key={quiz._id} quiz={quiz} />
      </div>
    </div>
  )
}

export default QuizRandomPage