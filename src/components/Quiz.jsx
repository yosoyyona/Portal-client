import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import { Pane, Button, Alert } from 'evergreen-ui'

const Quiz = ({quiz}) => {

  // active to change color depending on good bad answer
  const [active, setActive] = useState(false)

  const [response, setResponse] = useState('')

  const [message, setMessage] = useState('')

  // to make an array of answer
  const [answerList, setAnswerList] = useState([])
  
  useEffect(() => {

    const answerArray = [...[quiz.answer,quiz.answer2, quiz.answer3, quiz.answer4]]
    answerArray.sort(() => Math.random() - 0.5)
    setAnswerList(answerArray)

  },[])

  const handleClick = (answer) => {
    if(quiz.answer === answer) {
      setResponse('🥳Good Answer🎉')
      setMessage(quiz.message)
    } else {
      setResponse('Bad Answer!🥲')
    }
  };
  
  return (
    <div style={{marginTop: '20px', marginBottom: '20px'}}>
      <div style={{maxWidth: '75vw', padding:'2rem 1rem', margin:'auto', border:'1px solid grey', borderRadius:'10px'}}>
      <h3>{quiz.question}</h3>
      <p>{quiz.genre} </p>
      <p>{quiz.difficulty} </p>

      <div id='answerOption'>
      {answerList.map(answer => {
        return(
            <Button type="button" 
              onClick={() => handleClick(answer)} >{answer} </Button>
        )
      })}
      </div>
      
      <p>{response}</p>
      <p>{message}</p>
      
    </div>
    </div>
    

  )
}

export default Quiz