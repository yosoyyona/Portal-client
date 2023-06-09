import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';

const PostDetail = ({post, authorName, authorId}) => {

  let date = new Date(post.date)
  let dateString = date.toDateString()
  
  let altImageUrl = "/images/portal-alt-img.png"

  let stars = post.rating
  let starRating = ""
  if(stars === 0) starRating = "☆☆☆☆☆"
  if(stars === 1) starRating = "★☆☆☆☆"
  if(stars === 2) starRating = "★★☆☆☆"
  if(stars === 3) starRating = "★★★☆☆"
  if(stars === 4) starRating = "★★★★☆"
  if(stars === 5) starRating = "★★★★★"

  return (
    <Container style={{width: '100%', marginBottom:'5rem'}}>
    
      <div style={{display:'flex'}}>
        <h4 style={{marginRight:'10px'}}>{post.gameName} / </h4>
        <h4 style={{marginRight:'10px'}}>genre : {post.genre} /</h4>
        <h4> by : <Link to={`/user/${authorId}`}>{authorName}</Link></h4>
      </div>

      <div style={{display:'flex', marginTop:'4rem', marginBottom:'10px'}}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <h2 style={{marginBottom:'3rem'}}>{post.title}</h2>
          <p display="flex" style={{width:'70%'}}>{post.review}</p>
          <h4>{starRating}</h4>
          <p>{dateString}</p>
        </div>
      </div>
      
      { !post.imageUrl==""?
          <img src={post.imageUrl} style={{maxWidth:'40rem', width:'100%', height:'auto', borderRadius:'10px'}} className='img-fluid shadow-4' alt='...' />
          : <img src={altImageUrl} style={{maxWidth:'40rem', width:'100%', height:'auto', borderRadius:'10px'}} className='img-fluid shadow-4' alt='...' />
      }
      
    </Container>
  )
}

export default PostDetail