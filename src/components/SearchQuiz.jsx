import React from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Card } from 'evergreen-ui'

const SearchQuiz = ({quiz}) => {
  
  //🍊 Link!

  return (
    <Container style={{display:'flex', alignItems:"center", justifyContent:"center"}}>
      <Link to={`/`}>
        <Card elevation={1} 
        width={260}
        height="auto"
        margin={10}
        padding={15}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column">
          <h4>{quiz.question}</h4>
          <h5>{quiz.genre}</h5>
        </Card>
      </Link>
    </Container>
  )
}

export default SearchQuiz