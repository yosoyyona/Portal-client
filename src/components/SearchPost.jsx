import React from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Card } from 'evergreen-ui'

const SearchPost = ({post}) => {
  
  return (
    <Container style={{display:'flex', alignItems:"center", justifyContent:"center"}}>
      <Link to={`/posts/${post._id}`}>
        <Card elevation={1} 
        width={260}
        height="auto"
        margin={10}
        padding={15}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column">
          <h4>{post.title}</h4>
          <h5>{post.gameName}</h5>
          <h5>{post.genre}</h5>
          <h6>{post.review}</h6>
        </Card>
      </Link>
    </Container>
  )
}

export default SearchPost