import React, { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import { Pane, TextareaField, Button } from 'evergreen-ui'
import axios from 'axios'

const API_URL = "https://portal-project.netlify.app/";

function UserPage() {

  const { userId } = useParams()  
  
  // userId's info (my or other)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [posts, setPosts] = useState([])

  const { user } = useContext(AuthContext)
  const storedToken = localStorage.getItem('authToken');
  
  useEffect(() => {
    axios.get(`${API_URL}/user/${userId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      console.log(response.data)
      setName(response.data.name)
      setDescription(response.data.description)
    })
    .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    axios.get(`${API_URL}/user/${userId}/posts`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      console.log(response.data)
      setPosts(response.data)
    })
    .catch((error) => console.log(error))
  }, [])
  
  
  return (
    <div id='user'>

      {userId === user._id?
        <>
          <h3>Hello, {name}</h3>
          <p>{description}</p>
          
          <Link to={`/user/${userId}/edit`}><Button size="small">Edit profile</Button></Link>

          <hr />

          <h4>My posts</h4>
          <hr></hr>
          {posts.map(post => (

            <Link to={`/posts/${post._id}`} >
              <p>{post.title}</p>
              <hr></hr>
            </Link> 

          ))}

        </>
        :<>
          <h3>{name}' page</h3>
          <p>{description}</p>
          <Button size="small">Follow</Button>
          <hr />
          <h4>{name}' posts</h4>
          {posts.map(post => <p key={post._id}>{post.title}</p>)}
        </>
      }

    </div>
  )
}

export default UserPage