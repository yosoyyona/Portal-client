import { useState, useEffect, useContext } from "react";
import PostDetail from "../components/PostDetail";
import CommentPage from './CommentPage'
import { AuthContext } from "../context/auth.context";
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Pane, TextareaField, Button  } from 'evergreen-ui'
import axios from "axios";

function PostDetailsPage() {

  const { postId } = useParams()
  const [post, setPost] = useState([])
  const [authorName, setAuthorName] = useState([])
  const [authorId, setAuthorId] = useState([])
  const navigate = useNavigate()
  
  const { user } = useContext(AuthContext)
  console.log('hello', authorId, user._id)
  
  const API_URL = "https://vast-jade-woodpecker-sock.cyclic.app";
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${API_URL}/posts/${postId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      setPost(response.data)
      
      let [authorArray] = [...response.data.author]
      
      setAuthorName(authorArray.name)
      setAuthorId(authorArray._id)
    })
    .catch((error) => console.log(error))
  }, [])

  
  const deletePost = (id) => {
    setPost(post => {
      const newPost = post.filter(post => {
        return post._id !== id
      })
      return newPost
    })

    axios.delete(`${API_URL}/posts/${postId}`,
    { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(response => {
      const deletePost = response.data
      navigate('/posts')
    }).catch(err => {
      console.error(err)
    })
  }

  return (
    <div>
      <Pane display="flex" padding={16} marginLeft="3rem" marginRight="3rem">

        <Pane flex={1} alignItems="center" display="flex">
          <Link to='/posts'><Button size="small" appearance="primary">To Post List</Button></Link>
        </Pane>
        <Pane>
          {/* if author = user, show edit&delete button */}
          {authorId === user._id ?
          <><Link to={`/posts/${postId}/edit`}><Button marginRight={3} size="small">Edit</Button></Link>
          <Link to='/posts'><Button size="small" onClick={() => deletePost(post._id)}>Delete</Button></Link></>
          :<></>
          }
          
        </Pane>
      </Pane>
      
      <PostDetail post={post} authorName={authorName} />
        
      <hr />

      <CommentPage />

    </div>
  )
}

export default PostDetailsPage