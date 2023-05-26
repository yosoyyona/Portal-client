import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import Quiz from '../components/Quiz'
import { Pane, Button  } from 'evergreen-ui'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuizRandomPage = () => {
  
  const [quiz, setQuiz] = useState([])
  const { isLoggedIn } = useContext(AuthContext);
  
  const API_URL = "https://vast-jade-woodpecker-sock.cyclic.app";
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/quizzes/random`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => setQuiz(response.data))
    .catch((error) => console.log(error))
  }, [])

  function refreshPage(){
    navigate('/quizzes/random')
  }
  
  return (
    <div>
      <Pane display="flex" padding={16} marginLeft="3rem" marginRight="3rem">
          <Pane flex={1} alignItems="center" display="flex">
            <Link to='/quizzes'  marginRight={10}><Button size="small" appearance="primary">Back</Button></Link>
          </Pane>
        <Pane>
          {isLoggedIn && 
            <Link to='/quizzes/create'><Button size="small">Create a quiz!</Button> </Link>
          }
        </Pane>
      </Pane>
      
      <div className="quiz-page" >
        <Quiz key={quiz._id} quiz={quiz} />
      </div>

      <Pane flex={1} alignItems="center" display="flex" justifyContent='center' marginTop={5} >
          
          <Button size="small" color="info" onClick={navigate('/quizzes/random')} >Get another!</Button>
      </Pane>
    </div>
  )
}

export default QuizRandomPage