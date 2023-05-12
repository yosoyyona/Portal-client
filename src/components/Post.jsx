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
    <Container className="post d-flex">
      <Link to={`/posts/${post._id}`}>
        <div className=''>
          <div className="vw-70 m-3">
            <h2 className=''>{post.gameName}</h2>
            
            <h2>{post.title}</h2>
            
            

            <p>{post.author}</p>
            
            <p>{post.rating}/5</p>
            
            <p>{post.review}</p>
          </div>
          <div>
            <img src={post.imageUrl} width={"200em"} className='img-fluid shadow-4' alt='...' />
          </div>
          <h4>{dateString}</h4>
        </div>
      </Link>
    </Container>

  )
}

export default Post