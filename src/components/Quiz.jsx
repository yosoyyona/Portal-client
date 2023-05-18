import React from 'react'
import Container from 'react-bootstrap/Container';
import { Pane, Button, Alert } from 'evergreen-ui'

const Quiz = ({quiz}) => {
  return (
    
    <div className='border'>
      <h3>{quiz.question}</h3>
      <p>{quiz.genre} </p>
      <p>{quiz.difficulty} </p>
      
      <div>
        <Button type="submit" marginRight={3} 
        onClick={() => alert("Correct answer!")}>{quiz.answer} </Button>
        
        <Button type="submit" 
        onClick={() => alert("Wrong answer! Try again")}>{quiz.answer2} </Button>
        <Button type="submit" 
        onClick={() => alert("Wrong answer! Try again")}>{quiz.answer3} </Button>
        <Button type="submit" 
        onClick={() => alert("Wrong answer! Try again")}>{quiz.answer4} </Button>
      </div>
    </div>

  )
}

export default Quiz