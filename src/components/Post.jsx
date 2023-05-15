import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Card } from 'evergreen-ui'

const Post = ({post}) => {

  let date = new Date(post.date)
  let dateString = date.toDateString()
  
  // author populate
  // review first 30 letters
  
  
  let stars = post.rating
  let starRating = ""
  if(stars === 0) starRating = "☆☆☆☆☆"
  if(stars === 1) starRating = "★☆☆☆☆"
  if(stars === 2) starRating = "★★☆☆☆"
  if(stars === 3) starRating = "★★★☆☆"
  if(stars === 4) starRating = "★★★★☆"
  if(stars === 5) starRating = "★★★★★"
  
  return (
    <Container className="post d-flex">
      <Link to={`/posts/${post._id}`}>
        <Card elevation={1} 
        float="left"
        width={260}
        height={300}
        margin={10}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column">
          <div>
            
            <h3>{post.title}</h3>
            {post.gameName&&
            <h4 className='mb-0'>about "{post.gameName}"</h4>}
            
            <div display="flex" className="justify-content-between mt-0">
              {/* 🍊 */}
              <p>{post.author.name /*the .name makes everything bug*/ }</p>
              
              <p>{starRating}</p>
            </div>
            
            <p className="overflow-hidden mt-0">{post.review}</p>
          </div>
          <div>
            <img src={post.imageUrl} width={"180em"} className='img-fluid shadow-4' alt='...' />
          </div>
          <p>{dateString}</p>
        </Card>
      </Link>
    </Container>

  )
}

export default Post