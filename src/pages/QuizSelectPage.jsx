import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button, Pane, majorScale } from 'evergreen-ui'

const QuizSelectPage = () => {
  
  const { isLoggedIn } = useContext(AuthContext);


  return (
    <div>
      <Pane display="flex" padding={16}>
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
        
        <Pane height={180} width={240} display="flex" alignItems="center" justifyContent="center" border="default">
          <Link to="/quizzes/random">
            Random
          </Link>
        </Pane>  
        
        <Popup trigger={
          <Pane height={180} width={240} display="flex" alignItems="center" justifyContent="center" border="default">
            By Difficulty
          </Pane>} 
          position="center">
          <Link to='/quizzes/easy'><Button>Easy</Button></Link>
          <Link to='/quizzes/intermediate'><Button>Intermediate</Button></Link>
          <Link to='/quizzes/difficult'><Button>Difficult</Button></Link>
        </Popup>

        <Popup trigger={
          <Pane height={180} width={240} display="flex" alignItems="center" justifyContent="center" border="default">
            By Genre
          </Pane>} 
          position="center">
          <Link to='/quizzes/genre/:action'><Button>Action</Button></Link>
          <Link to='/quizzes/genre/:adventure'><Button>Adventure</Button></Link>
          <Link to='/quizzes/genre/:mmo'><Button>MMO</Button></Link>
          <Link to='/quizzes/genre/:puzzle'><Button>Puzzle</Button></Link>
          <Link to='/quizzes/genre/:roleplaying'><Button>RolePlaying</Button></Link>
          <Link to='/quizzes/genre/:simulation'><Button>Simulation</Button></Link>
          <Link to='/quizzes/genre/:sports'><Button>Sports</Button></Link>
          <Link to='/quizzes/genre/:strategy'><Button>Strategy</Button></Link>
        </Popup>

      </Pane>
    </div>
  )
}

export default QuizSelectPage