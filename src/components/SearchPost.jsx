import React from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Card } from 'evergreen-ui'

const SearchPost = ({post}) => {
  
  const reviewShorten = post.review.substring(0, 50)

  return (
    <Container style={{display:'flex', alignItems:"center", justifyContent:"center"}}>
      <Card elevation={1} 
        width="70vw"
        height="auto"
        margin={10}
        padding={15}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Link to={`/posts/${post._id}`}>
          <h4>{post.title}</h4>
          <h5>{post.gameName}</h5>
          <h5>{post.genre}</h5>
          <h6>{reviewShorten}...</h6>
        </Link>
      </Card>
    </Container>
  )
}

export default SearchPost