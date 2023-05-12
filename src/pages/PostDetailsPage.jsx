import { useState, useEffect, useContext } from "react";
import PostDetail from "../components/PostDetail";
import Comment from '../components/Comment'
import { AuthContext } from "../context/auth.context";
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Pane, Avatar, TextareaField, Button, Heading  } from 'evergreen-ui'
import axios from "axios";

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

  return (
    <div>
      <Link to='/posts'><Button display="flex" size="small">Back</Button></Link>
      
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