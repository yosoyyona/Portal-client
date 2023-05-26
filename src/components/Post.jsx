import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Card } from 'evergreen-ui'

const Post = ({post}) => {

  let reviewShorten = post.review.substring(0, 40)

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
    <Container style={{display:'flex', alignItems:"center", justifyContent:"center"}}>
        <Card elevation={1} 
          width="80vw"
          height="auto"
          margin={20}
          padding={10}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          backgroundColor='white'
        >
        <Link to={`/posts/${post._id}`}>
          {post.gameName&&
        
            <div style={{display:'flex', marginBottom:'20px', color:'black', justifyContent:'space-between', textAlign:'center'}}>

              <div style={{marginRight:'3rem', maxWidth:'35vw'}}>
                <h4 className='mb-0'>about "{post.gameName}"</h4>

                { !post.imageUrl==""?
                <img src={post.imageUrl} style={{borderRadius:'20px', maxHeight:'40rem', height:'auto'}} className='img-fluid shadow-4' alt="..." />
                : <img src={altImageUrl} style={{borderRadius:'20px', maxHeight:'40rem', height:'auto'}} className='img-fluid shadow-4' alt="..." />
                }

                
                
              </div>
            
              <div style={{display:'flex', justifyContent:'center', flexDirection:'column', maxWidth:'40vw'}}>
                <h3>{post.title}</h3>
                <p>{starRating}</p>
                <p>{dateString}</p>
                <p>{reviewShorten}...</p>
              </div>
              
            </div>
          }
        </Link>
      </Card>
    </Container>
  )
}

export default Post