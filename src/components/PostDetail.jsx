import React from 'react'
import Container from 'react-bootstrap/Container';


const PostDetail = ({post, authorName}) => {

  // author

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
      <div className='bg-dark'>
        <div style={{display: 'flex'}}>
          <h4>About: {post.gameName} / </h4> 
          <h4>genre : {post.genre} / </h4>
          <h4>post by : {authorName}</h4>
        </div>
        <div style={{display:'flex'}}>
        <div style={{display: 'flex', flexDirection:'column', justifyContent:'center' }}>
          <h2>{post.title}</h2>
          <p display="flex" className="text-start" style={{width:'80rem', textAlign:'left',width:'50rem', padding:'20px'}}>{post.review}</p>
          <h4>{starRating}</h4>
          <p>{dateString}</p>
        </div>
          <div style={{display:'flex', alignItems:'center', margin:'0px 10px 20px 40px'}}>
            <img src={post.imageUrl} style={{borderRadius:'10px', width:'40rem'}} className='img-fluid shadow-4' alt='...' />
          </div>
        </div>

          
          
    </div>
  )
}

export default PostDetail