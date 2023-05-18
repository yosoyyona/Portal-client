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
  const [userId, setUserId] = useState([])
  const navigate = useNavigate()
  
  const { user } = useContext(AuthContext)
  
  
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem('authToken');

  // userId...!
  /* useEffect(() => {
    if(user) setUserId = user._id
  }, []) */

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

      if(deletePost._id !== id){
        throw 'something went wrong'
      }
      navigate('/posts')
      
    }).catch(err => {
      console.error(err)
    })
  }

  return (
    <div>
      <Pane display="flex" padding={16}>
        <Pane flex={1} alignItems="center" display="flex">
          <Link to='/posts'><Button size="small" appearance="primary">Back</Button></Link>
        </Pane>
        <Pane>
          {/* if author = user, show edit&delete button */}
          {authorId === userId ?
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