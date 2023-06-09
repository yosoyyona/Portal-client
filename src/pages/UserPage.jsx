import React, { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import { Pane, Heading, TextareaField, Button } from 'evergreen-ui'
import axios from 'axios'

const API_URL = "https://vast-jade-woodpecker-sock.cyclic.app";

function UserPage() {

  const { userId } = useParams()  
  
  // userId's info (my or other)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [posts, setPosts] = useState([])
  const [quizzes, setQuizzes] = useState([])

  const { user } = useContext(AuthContext)
  const storedToken = localStorage.getItem('authToken');
  
  useEffect(() => {
    axios.get(`${API_URL}/user/${userId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      setName(response.data.name)
      setDescription(response.data.description)
    })
    .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    axios.get(`${API_URL}/user/${userId}/posts`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => setPosts(response.data))
    .catch((error) => console.log(error))
  }, [])
  
  useEffect(() => {
    axios.get(`${API_URL}/user/${userId}/quizzes`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => setQuizzes(response.data))
    .catch((error) => console.log(error))
  }, [])

  return (
    <div className='userPage'>

      {userId === user._id?
        <div>

          <Pane display="flex" alignItems="center" marginTop="20px">
            <Pane flex={1} display="flex">
              <Heading size={800} >Hello, {user.name}</Heading>
            </Pane>
            <Pane>
              <Link to={`/user/${userId}/edit`}><Button size="small" marginTop={7} marginLeft={8}>Edit profile</Button></Link>
            </Pane>
          </Pane>

          <Heading size={600} margin="20px" color="#696f8c">{description}</Heading>
          
          <hr />

          <Pane display="flex" alignItems="center">
            <Pane flex={1} display="flex">
              <h4>My posts</h4>
            </Pane>
            <Pane>
              <Link to="/posts/create">
                <Button size="small" marginBottom={5} appearance="primary">Create Post</Button>
              </Link>
            </Pane>
          </Pane>

          {posts.map(post => (
            <Pane display="flex" alignItems="center" >
              <Pane flex={1} display="flex">
                <Link to={`/posts/${post._id}`} >
                <p>{post.title}</p>
              </Link> 
              </Pane>
              <Pane>
                <Link to={`/posts/${post._id}/edit`}><Button size="small" marginBottom={5} marginRight={5}>Edit</Button></Link>
              </Pane>
            </Pane>
          ))}

          <hr></hr>

          <Pane display="flex" alignItems="center" >
            <Pane flex={1} display="flex">
              <h4>My quizzes</h4>
            </Pane>
            <Pane>
              <Link to="/quizzes/create">
                <Button size="small" marginBottom={5} appearance="primary">Create Quiz</Button>
              </Link>
            </Pane>
          </Pane>
          
          {quizzes.map(quiz => (
            <Pane display="flex" alignItems="center" >
              <Pane flex={1} display="flex">
              <Link to={`/quizzes/${quiz._id}`} >
              <p>{quiz.question}</p>
            </Link> 
              </Pane>
              <Pane>
                <Link to={`/quizzes/${quiz._id}/edit`}>
                  <Button size="small" marginBottom={5} marginRight={5}>Edit</Button>
                </Link>
                
              </Pane>
            </Pane>

          ))}

        </div>
        :<>
          <Pane display="flex" alignItems="center" >
            <Pane flex={1} display="flex">
              <h3>{name}' page</h3>
            </Pane>
          </Pane>

          <Heading size={600} margin="20px" color="#696f8c">{description}</Heading>

          <hr />
          <h4>{name}' posts</h4>
          
          {posts.map(post => (
            <Link to={`/posts/${post._id}`} >
              <p>{post.title}</p>
            </Link> 
          ))}

          <hr />
          <h4>{name}' quizzes</h4>

          {quizzes.map(quiz => (
            <Link to={`/quizzes/${quiz._id}`} >
              <p>{quiz.question}</p>
            </Link> 
          ))}

        </>
      }

    </div>
  )
}

export default UserPage