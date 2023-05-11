import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';

const Post = ({post}) => {

  let date = new Date(post.date)
  let dateString = date.toDateString()
  
  // author populate
  // review first 30 letters
  // rating expressed with stars
  
  return (
    <Container className="post">
      <Link to={`/posts/${post._id}`}>
        <div>
          <div className="vw-70 m-3">
            <h2>{post.gameName}</h2>
            
            <h2>{post.title}</h2>
            
            <h4>{dateString}</h4>

            <p>{post.author}</p>
            
            <p>{post.rating}/5</p>
            
            <p>{post.review}</p>
          </div>
          <div>
            <img src={post.imageUrl} className='img-fluid shadow-4' alt='...' />
          </div>
        </div>
      </Link>
    </Container>

  )
}

export default Post