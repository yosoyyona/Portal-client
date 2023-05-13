import React from 'react'
import Container from 'react-bootstrap/Container';

const PostDetail = ({post}) => {

  // author

  
  let stars = post.rating
  let starRating = ""
  if(stars === 0) starRating = "☆☆☆☆☆"
  if(stars === 1) starRating = "★☆☆☆☆"
  if(stars === 2) starRating = "★★☆☆☆"
  if(stars === 3) starRating = "★★★☆☆"
  if(stars === 4) starRating = "★★★★☆"
  if(stars === 5) starRating = "★★★★★"

  return (
    <Container>

      <h2>{post.title}</h2>
      <h3>{post.gameName}</h3>
      <h3>{post.genre}</h3>
      <p display="flex" className="text-start">{post.review}</p>
      
      <h4>{starRating}</h4>

      <div>
        <img src={post.imageUrl} className='img-fluid shadow-4' alt='...' />
      </div>
    </Container>
  )
}

export default PostDetail