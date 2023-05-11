import React, { useState, useContext, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import { TextInputField, TextareaField, SelectField, Pane, FileUploader, FileCard, Button } from 'evergreen-ui'
import axios from 'axios'

function QuizPage() {
  return (
    <div>
      <Link to='/quizzes/create'><button>create a quiz!!</button> </Link>
    </div>
  )
}

export default QuizPage