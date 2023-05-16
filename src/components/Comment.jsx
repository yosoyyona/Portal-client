import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Pane, Avatar, Button } from 'evergreen-ui'
import axios from 'axios'



const Comment = ({comment}) => {

  const { postId } = useParams()

  console.log(comment)
  
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem('authToken');

  let date = new Date(comment.date)
  let dateString = date.toDateString()
  
  const deleteComment = (id) => {

    axios.delete(`${API_URL}/posts/${postId}/comments}`,
    { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(response => {
      const deleteComment = response.data
      console.log(response)

      if(deleteComment._id !== id){
        throw 'something went wrong'
      }
      navigate(`${API_URL}/posts/${postId}`)
      
    }).catch(err => {
      console.error(err)
    })
  }

  
  // Task to do - delete comment with deleteComment button
  
  return (
    <Container className="comment">
      
      <Pane>
        <Avatar name={comment.author.name} size={30} marginRight={16} shape="square" />
        <p>{comment.message}</p>
        <p>{dateString}</p>
        <Button size="small" onClick={(comment) => deleteComment(comment._id)}>Delete</Button>
      </Pane>
      
    </Container>
  )
}

export default Comment