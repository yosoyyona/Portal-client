import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import { TextInputField, TextareaField, Button } from 'evergreen-ui'
import axios from 'axios'

const API_URL = "http://localhost:5005";

const Comment = ({post}) => {

  

  let date = new Date(post.date)
  let dateString = date.toDateString()


  
  // author populate
  // message, date

  return (
    <Container className="comment">
      
      
    </Container>
  )
}

export default Comment