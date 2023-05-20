import React from 'react'
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Pane, Avatar, Button } from 'evergreen-ui'
import { AuthContext } from "../context/auth.context";

const Comment = ({comment, handleDelete}) => {

  let date = new Date(comment.date)
  let dateString = date.toDateString()

  const { user } = useContext(AuthContext)
  const storedToken = localStorage.getItem('authToken');
  const authorId = comment.author


  return (
    <Container className="comment">
      
      <Pane style={{backgroundColor:''}}>
          <div style={{display:'flex', padding:'20px 0px 0px 20px'}}>
            <Avatar name={comment.author.name} size={30} marginRight={16} shape="square" />
            <p>{dateString}</p>
            {authorId._id === user._id ?
              <Button style={{margin: '0 0 0px 30px'}} size="small" onClick={() => handleDelete(comment._id)}>Delete</Button>
              :<></>
            }
            
          </div>
          <div>
            <p style={{display:'flex', padding:'10px 0px 0px 70px' }}>{comment.message}</p>
          </div>
        
      </Pane>
      
    </Container>
  )
}

export default Comment