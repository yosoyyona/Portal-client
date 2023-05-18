import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Pane, Avatar, Button } from 'evergreen-ui'
import axios from 'axios'


const Comment = ({comment, deleteComment}) => {

  const { postId } = useParams()
  
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem('authToken');

  let date = new Date(comment.date)
  let dateString = date.toDateString()
  
  

  
  // Task to do - delete comment with deleteComment button
  
  return (
    <Container className="comment">
      
      <Pane style={{backgroundColor:''}}>
          <div style={{display:'flex', padding:'20px 0px 0px 20px'}}>
            <Avatar name={comment.author.name} size={30} marginRight={16} shape="square" />
            <p>{dateString}</p>
            <Button style={{margin: '0 0 0px 30px'}} size="small" onClick={() => deleteComment(comment._id)}>Delete</Button>
          </div>
          <div>
            <p style={{display:'flex', padding:'10px 0px 0px 70px' }}>{comment.message}</p>
          </div>
        
        
        
        
      </Pane>
      
    </Container>
  )
}

export default Comment