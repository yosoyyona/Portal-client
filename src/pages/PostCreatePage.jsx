import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";

import axios from 'axios'

const PostCreatePage = () => {
  
  const [ post, setPost ] = useState([])
  
  const { user } = useContext(AuthContext)

  const navigate = useNavigate()


  const handleSubmit = (event) => {

    event.preventDefault()

    const form = event.target

    const newPost = { 
      title: form.title.value, 
      author: user._id, 
      gameName: form.gameName.value, 
      genre: form.genre.value, 
      review: form.review.value, 
      image, 
      rating 
    }
    console.log(newPost)

    // 🍊 check!
    axios.post(`http://localhost:5005/posts/`, newPost,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        if (response.data) {
          const newPosts = response.data
          setPost(newPosts)
        }
      })
  }

  // 🍊 check!
  const storedToken = localStorage.getItem('authToken');
  

  return (
    <div>
      <h1> Create a post📝 </h1>

      <form onSubmit={handleSubmit}>

        <label htmlFor='title'>Title: </label>
        <input type='text' name='title' />

        <label htmlFor='gameName'>Game Name: </label>
        <input type='text' name='gameName' /> {/* connecting to API? */}

        <label htmlFor='genre'>Genre: </label>
        <select name="genre">
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="MMO">MMO</option>
          <option value="Puzzle">Puzzle</option>
          <option value="RolePlaying">Role-playing</option>
          <option value="Simulation">Simulation</option>
          <option value="Sports">Sports</option>
          <option value="Strategy">Strategy</option>
          <option value="ETC">ETC</option>
        </select>

        <label htmlFor='review'>Review: </label>
        <textarea type='text' name='review' />
        
        <label htmlFor='image'>Image </label>
        {/* image upload */}
        
        <label htmlFor='rating'>Rating </label>
        {/* star rating */}

        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default PostCreatePage