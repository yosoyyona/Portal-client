import React from 'react'
import Container from 'react-bootstrap/Container';

const PostDetail = ({post, authorName}) => {

  let date = new Date(post.date)
  let dateString = date.toDateString()
  
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

      <h4>{authorName}</h4>
      
      <p>{dateString}</p>
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