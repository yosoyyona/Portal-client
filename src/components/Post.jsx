import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Card } from 'evergreen-ui'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    <Container style={{display:'flex', alignItems:"center", justifyContent:"center"}}>
      <Link to={`/posts/${post._id}`}>
        <Card elevation={1} 
        width={800}
        height="auto"
        margin={30}
        padding={15}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column">
          <div>
            {post.gameName&&
            <div style={{}}>

              <div style={{display:'flex'}}>
                  <h4 className='mb-0'>about "{post.gameName}"</h4>
                  <p>{dateString}</p>
                  {/*<p>by : {post.author.name}</p>*/}
              </div>
            
              <div style={{display:'inline-flex', justifyContent:'center'}}>
              <img src={post.imageUrl} width={"180em"} style={{borderRadius:'10px', width:'20rem'}} className='img-fluid shadow-4' alt='...' />
                <h3>{post.title}</h3>
                
              </div>
              
            </div>
            
            }
            
            <div className=" d-flex justify-content-between mt-0">
              {/* 🍊 */}
              
              
              <p>{starRating}</p>
            </div>
            
          </div>
          
        </Card>
      </Link>
    </Container>

  )
}

export default Post