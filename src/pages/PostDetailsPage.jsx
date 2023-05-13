import { useState, useEffect, useContext } from "react";
import PostDetail from "../components/PostDetail";
import Comment from '../components/Comment'
import { AuthContext } from "../context/auth.context";
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Pane, TextareaField, Button  } from 'evergreen-ui'
import axios from "axios";

function PostDetailsPage() {

  const { postId } = useParams()
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState([])
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${API_URL}/posts/${postId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => setPost(response.data))
    .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    axios.get(`${API_URL}/posts/${postId}/comments`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => setComments(response.data))
    .catch((error) => console.log(error))
  }, [newComment])


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

  // to create new comment
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target

    const requestBody = { 
      author: user._id, 
      message: form.message.value, 
      post: postId
    }
    console.log(requestBody)

    axios.post(`${API_URL}/posts/${postId}/comments`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        if (response.data) setNewComment(response.data)
        navigate(`/posts/${postId}`)
      })
      .catch((error) => console.log(error))
  }


  return (
    <div>
      <Pane display="flex" padding={16}>
        <Pane flex={1} alignItems="center" display="flex">
          <Link to='/posts'><Button size="small" appearance="primary">Back</Button></Link>
        </Pane>
        <Pane>
          {/* Below you can see the marginRight property on a Button. */}
          <Link to={`/posts/${postId}/edit`}><Button marginRight={3} size="small">Edit</Button></Link>
          <Link to='/posts'><Button size="small" onClick={() => deletePost(post._id)}>Delete</Button></Link>
        </Pane>
      </Pane>
      
      <PostDetail post={post} />
        {post.title} {/* 🍊 */}


      <div id="comments-list">
        <h4>Comments</h4>
        {comments &&
        comments.map(comment => <Comment key={comment._id} comment={comment} />)}
      </div>
      
      
      <Pane display="flex" className="align-top">
        <form  onSubmit={handleSubmit}>
          <TextareaField
            required isInvalid={false}
            label="Comment"
            name='message'
            type='text'
            validationMessage="This field is required"
          />
          <Button type="submit" size="small">Submit</Button>
        </form>
      </Pane>

    </div>
  )
}

export default PostDetailsPage