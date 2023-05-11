import React, { useState, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import { TextInputField, TextareaField, SelectField, Pane, FileUploader, FileCard, Button } from 'evergreen-ui'
import axios from 'axios'

const API_URL = "http://localhost:5005";

function QuizCreatePage() {
    const [ quiz, setQuiz ] = useState([])
    
    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    const handleSubmit = (e) => {
    
        e.preventDefault()
        const form = e.target
    
        const storedToken = localStorage.getItem('authToken');
    
        const requestBody = { 
          title: form.title.value, 
          author: user._id, 
          difficulty: form.difficulty.value, 
          theme: form.theme.value, 
          question: form.question.value,
          question2: form.question2.value
          
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
          label="Title"
          name='title'
          type='text'
          validationMessage="This field is required"
        />
        <SelectField
          label="Difficulty"
          name="difficulty"
        >
          <option value="easy" defaultValue>Easy</option>
          <option value="intermediate">Intermediate</option>
          <option value="difficult">Difficult</option>
          
        </SelectField>

        <SelectField
          label="Genre of the game"
          name="theme"
        >
          <option value="retro" defaultValue>Retro</option>
          <option value="new">New</option>
          <option value="online">Online</option>
          <option value="adventure">Adventure</option>
          
        </SelectField>

        <TextInputField
          required isInvalid={false}
          label="Good answer"
          name='question'
          type='text'
          validationMessage="This field is required"
        />
        <TextInputField
          required isInvalid={false}
          label="Bad answer"
          name='question2'
          type='text'
          validationMessage="This field is required"
        />
        
        <Button type="submit">Submit</Button>

    </form>
    </div>
  )
}

export default QuizCreatePage