import { useState, useEffect, useContext } from "react";
import PostDetail from "../components/PostDetail";
import Comment from '../components/Comment'
import { AuthContext } from "../context/auth.context";
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Pane, Avatar, TextareaField, Button, Heading  } from 'evergreen-ui'
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function PostDetailsPage() {

  const { postId } = useParams()
  const [post, setPost] = useState([])
  const [ comment, setComment ] = useState([])
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

      <Heading is="h3">Comment</Heading>

      <Pane display="flex" className="align-top">
        <Avatar name={user.name} size={30} marginRight={16} shape="square" />
        <form>
          <TextareaField
            isInvalid={false}
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