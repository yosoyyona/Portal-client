import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import { TextInputField, TextareaField, SelectField, Pane, Button } from 'evergreen-ui'
import axios from 'axios'

const API_URL = "https://vast-jade-woodpecker-sock.cyclic.app";

function QuizCreatePage() {
    const [ quiz, setQuiz ] = useState([])
    
    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    const handleSubmit = (e) => {
    
      e.preventDefault()
      const form = e.target
  
      const storedToken = localStorage.getItem('authToken');
  
      const requestBody = { 
        author: user._id, 
        question: form.question.value, 
        genre: form.genre.value, 
        difficulty: form.difficulty.value, 
        answer: form.answer.value,
        answer2: form.answer2.value,
        answer3: form.answer3.value,
        answer4: form.answer4.value,
        message: form.message.value
      }
      console.log(requestBody)
      
      axios.post(`${API_URL}/quizzes/create`, requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
          if (response.data) setQuiz(response.data)
          navigate("/quizzes")
        })
    }

  
  return (
    <div>
      <h2>Create your Quiz!!</h2>
      <form onSubmit={handleSubmit}>
        <TextInputField
          required isInvalid={false}
          label="Question"
          name='question'
          type='text'
          validationMessage="This field is required"
        />

        <SelectField
          label="Genre of the game"
          name="genre"
        >
          <option value="Action" defaultValue>Action</option>
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
          name="difficulty"
        >
          <option value="easy" defaultValue>Easy</option>
          <option value="intermediate">Intermediate</option>
          <option value="difficult">Difficult</option>
        </SelectField>

        <TextInputField
          required isInvalid={false}
          label="Correct answer"
          name='answer'
          type='text'
          validationMessage="This field is required"
        />

        <TextInputField
          required isInvalid={false}
          label="Wrong answer"
          name='answer2'
          type='text'
          validationMessage="This field is required"
        />

        <TextInputField
          required isInvalid={false}
          label="Another wrong answer"
          name='answer3'
          type='text'
          validationMessage="This field is required"
        />
        
        <TextInputField
          required isInvalid={false}
          label="Last wrong answer"
          name='answer4'
          type='text'
          validationMessage="This field is required"
        />

        <TextareaField
          isInvalid={false}
          label="Message"
          name='message'
          type='text'
        />
        
        <Button type="submit">Submit</Button>

      </form>
    </div>
  )
}

export default QuizCreatePage