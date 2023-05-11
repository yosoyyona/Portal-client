import React from 'react'
import Container from 'react-bootstrap/Container';

const PostDetail = ({post}) => {

  // author

  return (
    <Container>

      <h2>{post.title}</h2>
      <h3>{post.gameName}</h3>
      <h3>{post.genre}</h3>
      <p display="flex" className="text-start">{post.review}</p>
      
      <h4>{post.rating}</h4>

      <div>
        <img src={post.imageUrl} className='img-fluid shadow-4' alt='...' />
      </div>
    </Container>
  )
}

export default PostDetail