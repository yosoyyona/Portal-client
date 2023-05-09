import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import { Button } from 'evergreen-ui'

const Post = ({post}) => {

  
  let date = new Date(post.date)
  let dateString = date.toDateString()
  
  // author populate
  // review first 30 letters
  // rating expressed with stars
  
  return (
    <Link to={`/posts/${post._id}`}>
      <div className="text-center post">
        <h2>{post.gameName}</h2>
        
        <h2>{post.title}</h2>
        
        <h4>{dateString}</h4>

        <p>{post.author}</p>
        <p>{post.genre}</p>
        <p>{post.rating}</p>
        
        <p>{post.review}</p>
        
        <img src="/images/stardew valley.png" 
          className='img-fluid shadow-4' alt='...'
        />
      </div>
    </Link>
      

  )
}

export default Post