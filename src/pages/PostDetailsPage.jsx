import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from 'react-router-dom'

function PostDetailsPage() {

  const { postId } = useParams()
  const [post, setPost] = useState([])
  const navigate = useNavigate()

  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${API_URL}/api/posts/${postId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => setPost(response.data))
    .catch((error) => console.log(error))
  }, [])

  return (
    <div>
      <h2>{post.title}</h2>

    </div>
  )
}

export default PostDetailsPage