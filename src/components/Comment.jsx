import React from 'react'
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Pane, Avatar, Button } from 'evergreen-ui'

const Comment = ({comment, handleDelete}) => {

  let date = new Date(comment.date)
  let dateString = date.toDateString()

  // Task to do - delete comment with deleteComment button
  
  return (
    <Container className="comment">
      
      <Pane>
        <Avatar name={comment.author.name} size={30} marginRight={16} shape="square" />
        <p>{comment.message}</p>
        <p>{dateString}</p>
        <Button size="small" onClick={() => handleDelete(comment._id)}>Delete</Button>
      </Pane>
      
    </Container>
  )
}

export default Comment