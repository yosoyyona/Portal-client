import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom'
import Comment from '../components/Comment'
import axios from "axios";

function PostDetailsPage() {

  const { postId } = useParams()
  const [post, setPost] = useState([])
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
      <h2>{post.title}</h2>
      <Comment />
      <Link to='/posts'><button>Back</button> </Link>

    </div>
  )
}

export default PostDetailsPage