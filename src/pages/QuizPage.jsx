import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import { TextInputField, TextareaField, SelectField, Pane, FileUploader, FileCard, Button } from 'evergreen-ui'
import axios from 'axios'



const API_URL = "http://localhost:5005";

function QuizPage() {

  const [quiz, setQuiz] = useState([])
  const { isLoggedIn } = useContext(AuthContext);

  const storedToken = localStorage.getItem('authToken');

  const getAllQuiz = () => {
    axios.get(`${API_URL}/quizzes`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => setQuiz(response.data))
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    getAllQuiz()
  }, [])


  return (
    <div>

       {isLoggedIn && 
        <Link to='/quizzes/create'><button>create a quiz!!</button> </Link>
       }
      

      <div id="post-list" >
        {quiz.map(quiz =>{
          return(
            <div key={quiz._id} className='border'>
              <h3>{quiz.title}</h3>
              <p>{quiz.theme} </p>
              <p>{quiz.title} </p>
              <div>
                <button>{quiz.question} </button>
                <button>{quiz.question2} </button>
              </div>
            </div>
          )
        } 
          
        )}
      </div>
    </div>
  )
}

export default QuizPage