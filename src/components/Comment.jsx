import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Pane, Avatar, Button } from 'evergreen-ui'
import axios from 'axios'

const API_URL = "http://localhost:5005";

const Comment = ({comment}) => {

  const { postId } = useParams()
  const { commentId } = useParams()
  
  let date = new Date(comment.date)
  let dateString = date.toDateString()
  
  
  const storedToken = localStorage.getItem('authToken');
  
  const deleteComment = (id) => {
    axios.delete(`${API_URL}/posts/${postId}/comments/${commentId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        const deleteComment = response.data

        if(deleteComment._id !== id){
          throw 'something went wrong'
        }
        
      }).catch(err => {
        console.error(err)
      })
  }
  
  // author populate
  // message, date

  return (
    <Container className="comment">
      
      <Pane>
        <Avatar name={comment.author.name} size={30} marginRight={16} shape="square" />
        <p>{comment.message}</p>
        <p>{dateString}</p>
        <Button size="small" onClick={() => deleteComment(comment._id)}>Delete</Button>
      </Pane>
      
    </Container>
  )
}

export default Comment