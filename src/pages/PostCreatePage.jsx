import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import axios from 'axios'

const PostCreatePage = () => {
  
  const [post, setPost] = useState([])
  const { user } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = (event) => {

    event.preventDefault()

    const form = event.target

    //🍊
  }

  return (
    <div>
      <h1> Create a post📝 </h1>


      <form onSubmit={handleSubmit}>

        <input type='text' name='title' />
        <input type='text' name='gameName' /> {/* connecting to API? */}
        <input type='text' name='genre' /> {/* option select */}
        <input type='text' name='review' /> {/* textarea? */}
        {/* image upload */}
        {/* rating - select(stars?) */}
        
        <input type='submit' />
      </form>

    </div>
  )
}

export default PostCreatePage