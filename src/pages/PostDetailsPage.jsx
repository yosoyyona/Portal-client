import { useState, useEffect } from "react";
import PostDetail from "../components/PostDetail";
import Comment from '../components/Comment'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { TextInputField, TextareaField, Button } from 'evergreen-ui'
import axios from "axios";

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

  return (
    <div>
      <Link to='/posts'><Button display="flex" size="small">Back</Button></Link>
      
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