import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button, Pane, majorScale } from 'evergreen-ui'

function HomePage() {
  return (
    
    <Pane display="flex" alignItems="center" marginX={majorScale(2)}>
      <Link to="/posts">
        <Button>Post</Button>
      </Link>
      <Link to="/quizzes">
        <Button>Quiz</Button>
      </Link>
    </Pane>

  )
}

export default HomePage