import { useState, useEffect } from "react";
import PostDetail from "../components/PostDetail";
import Comment from '../components/Comment'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { TextInputField, TextareaField, Button } from 'evergreen-ui'
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function PostDetailsPage() {

  const { postId } = useParams()
  const [post, setPost] = useState([])
  const [ comment, setComment ] = useState([])

  const navigate = useNavigate()

  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${API_URL}/posts/${postId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => setPost(response.data))
    .catch((error) => console.log(error))
  }, [])

  const deletePost = (id) => {
      setPost(post => {
        const newPost = post.filter(post => {
          return post._id !== id
        })
        return newPost
      })

      axios.delete(`http://localhost:5005/posts/${postId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        const deletePost = response.data

        if(deletePost._id !== id){
          throw 'something went wrong'
        }navigate('/posts')
        
        
      }).catch(err => {
        console.error(err)
      })
  }

  const editPost = () => {

  }

  return (
    <div>
      <Link to='/posts'><Button display="flex" size="small">Back</Button></Link>

      <Link to='/posts'><button onClick={() => deletePost(post._id)}>Delete this post</button></Link>
      <Link to={`/posts/${postId}/edit`}>edit this post</Link>
      <PostDetail post={post} />
      <Comment post={post} />

      <form>
        <TextareaField
          required isInvalid={false}
          label="Comment"
          name='message'
          type='text'
          validationMessage="This field is required"
        />
        <Button type="submit" size="small">Submit</Button>
      </form>

    </div>
  )
}

export default PostDetailsPage