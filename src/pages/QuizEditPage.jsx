import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Pane, TextInputField, TextareaField, SelectField, Button } from 'evergreen-ui'

const API_URL = "https://vast-jade-woodpecker-sock.cyclic.app";

function QuizEditPage() {
  
  const { quizId } = useParams()
  const { user } = useContext(AuthContext)
  
  const navigate = useNavigate()
  const storedToken = localStorage.getItem('authToken');

  const [question, setQuestion] = useState("")
  const [genre, setGenre] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [answer, setAnswer] = useState("")
  const [answer2, setAnswer2] = useState("")
  const [answer3, setAnswer3] = useState("")
  const [answer4, setAnswer4] = useState("")
  const [message, setMessage] = useState("")
  

  // retrieve quiz data
  useEffect(() => {
    axios.get(`${API_URL}/quizzes/${quizId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      const previousQuiz = response.data
      setQuestion(previousQuiz.question)
      setGenre(previousQuiz.genre)
      setDifficulty(previousQuiz.difficulty)
      setAnswer(previousQuiz.answer)
      setAnswer2(previousQuiz.answer2)
      setAnswer3(previousQuiz.answer3)
      setAnswer4(previousQuiz.answer4)
      setMessage(previousQuiz.message)
    })
    .catch((error) => console.log(error))
  }, [quizId])

  const handleFormSubmit = (e) => {
    
    e.preventDefault()
    const requestBody = { question, genre, difficulty, answer, answer2, answer3, answer4, message, author:user._id}

    axios.put(`${API_URL}/quizzes/${quizId}/edit`, requestBody,
    { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => {
      navigate(`/quizzes/${quizId}`)
    }).catch((err) => console.log(err));
  }

  const deleteQuiz = (quizId) => {
    
    axios.delete(`${API_URL}/quizzes/${quizId}`,
    { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(response => {
      const deleteQuiz = response.data
      navigate(`/user/${user._id}`)
    }).catch(err => console.error(err))
  }


  return (
    <div>
      <h2> Edit your Quiz </h2>
      <Pane display="flex" marginLeft="3rem" marginRight="3rem">
        <Pane flex={1} alignItems="center" display="flex">
          <Link to={`/user/${user._id}`}><Button size="small" appearance="primary">Back</Button></Link>
        </Pane>
        <Pane>
          <Button size="small" marginBottom={5} intent="danger" onClick={() => deleteQuiz(quizId)}>Delete</Button>
        </Pane>
      </Pane>
      
      <div style={{display:'flex', alignItems:'center', flexDirection:'column', paddingTop:'20px'}}>
        <form onSubmit={handleFormSubmit} style={{width:'70vw'}}>

          <TextInputField
            required isInvalid={false}
            label="Question"
            name='question'
            type='text'
            defaultValue={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          
          <SelectField
            label="Genre of the game"
            name="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="MMO">MMO</option>
            <option value="Puzzle">Puzzle</option>
            <option value="RolePlaying">Role-playing</option>
            <option value="Simulation">Simulation</option>
            <option value="Sports">Sports</option>
            <option value="Strategy">Strategy</option>
            <option value="ETC">ETC</option>
          </SelectField>
          
          <SelectField
            label="Difficulty"
            name='difficulty'
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="intermediate">Intermediate</option>
            <option value="hard">Hard</option>
          </SelectField>
          
          <TextInputField
            required isInvalid={false}
            label="Correct answer"
            name='answer'
            type='text'
            defaultValue={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          
          <TextInputField
            required isInvalid={false}
            label="Wrong answer"
            name='answer2'
            type='text'
            defaultValue={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
          />

          <TextInputField
            required isInvalid={false}
            label="Another wrong answer"
            name='answer3'
            type='text'
            defaultValue={answer3}
            onChange={(e) => setAnswer3(e.target.value)}
          />

          <TextInputField
            required isInvalid={false}
            label="Last wrong answer"
            name='answer'
            type='text'
            defaultValue={answer4}
            onChange={(e) => setAnswer4(e.target.value)}
          />

          <TextareaField
            isInvalid={false}
            label="Message"
            name='message'
            type='text'
            defaultValue={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button type="submit">Submit</Button>
        </form>
      </div>

    </div>
  )
}

export default QuizEditPage