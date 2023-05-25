import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import Quiz from '../components/Quiz'
import { Heading, Pane, Button } from 'evergreen-ui'
import axios from 'axios'

function QuizListPage() {
  
  const [quizzes, setQuizzes] = useState([])
  const { isLoggedIn } = useContext(AuthContext);
  
  const API_URL = "https://vast-jade-woodpecker-sock.cyclic.app";
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${API_URL}/quizzes/all`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => setQuizzes(response.data))
    .catch((error) => console.log(error))
  }, [])

  const [page, setPage] = useState(1)
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes)
  const [backButtonStyle, setBackButtonStyle] = useState("")
  const [nextButtonStyle, setNextButtonStyle] = useState("")

  const displayButtons = (backButton, nextButton) => {
    if (backButton) setBackButtonStyle("visible")
    else setBackButtonStyle("disabled")
    if (nextButton) setNextButtonStyle("visible")
    else setNextButtonStyle("disabled")
  }

  const setCurrentPage = currentPage => {

    if (quizzes.length <= 5) displayButtons(false, false)
    else {
      setPage(currentPage)

      if (currentPage == 1) displayButtons(false, true)
      else if (currentPage * 5 > quizzes.length) displayButtons(true, false)
      else displayButtons(true, true) 
    }
  }

  useEffect(() => {
    setCurrentPage(page)
  }, [])

  useEffect(() => {
    setFilteredQuizzes(pagination(page))
  }, [page])

  const pagination = page => quizzes.slice((page - 1) * 5, 5 * page)

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
      
      {
        filteredQuizzes.length > 0 ?
        <div id="quiz-list">
          {filteredQuizzes.map(quiz => <Quiz key={quiz._id} quiz={quiz} />)}
        </div>
        : <Heading size={700}>No Quizzes present!</Heading>
      }

      {
        quizzes.length > 5 &&
        <div>
          <Heading size={400} marginBottom="10px">Page {page}</Heading>
        </div>
      }

      <Button className={backButtonStyle} onClick={() => { setCurrentPage(page - 1) }} size="small" marginRight="8px">Back</Button>
      <Button className={nextButtonStyle} onClick={() => { setCurrentPage(page + 1) }} size="small">Next</Button>

    </div>
  )
}

export default QuizListPage