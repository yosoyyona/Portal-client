import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Heading, Button, Pane, majorScale } from 'evergreen-ui'

const QuizSelectPage = () => {
  
  const { isLoggedIn } = useContext(AuthContext);


  return (
    <div>
      <Pane display="flex" padding={16} marginLeft="3rem" marginRight="3rem">
        <Pane flex={1} alignItems="center" display="flex">
          <Link to='/'><Button size="small" appearance="primary">Back</Button></Link>
        </Pane>
        <Pane>
          {isLoggedIn && 
            <Link to='/quizzes/create'><Button size="small">Create a quiz!</Button> </Link>
          }
        </Pane>
      </Pane>

      <Pane alignItems="center" marginX={majorScale(2)}>
        <div style={{display:'flex', maxWidth:'80vw', alignItems:'center', flexDirection:'column', paddingTop:'20px'}}>
          
          <Link to="/quizzes/all">
            <Pane width="50vw" height="15rem" marginBottom='8px' display="flex" alignItems="center" justifyContent="center" border="default">
              <Heading size={700} color="747bff">All</Heading>
            </Pane>  
          </Link>
          
          <Link to="/quizzes/random">
            <Pane width="50vw" height="15rem" marginBottom='8px' display="flex" alignItems="center" justifyContent="center" border="default">
              <Heading size={700} color="747bff">Random</Heading>
            </Pane>  
          </Link>

          <Popup trigger={
            <Pane width="50vw" height="15rem" marginBottom='8px' display="flex" alignItems="center" justifyContent="center" border="default">
              <Heading size={700} color="747bff">Random By Difficulty</Heading>
            </Pane> } 
            position="center">
            <Link to='/quizzes/difficulty/easy'><Button>Easy</Button></Link>
            <Link to='/quizzes/difficulty/intermediate'><Button>Intermediate</Button></Link>
            <Link to='/quizzes/difficulty/hard'><Button>Hard</Button></Link>
          </Popup>
        </div>
        
      </Pane>
    </div>
  )
}

export default QuizSelectPage