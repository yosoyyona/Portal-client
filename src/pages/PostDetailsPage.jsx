import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button } from 'evergreen-ui'
import Post from '../components/Post'


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
      <h3>{post.title}</h3>
      <p>{post.review}</p>
      <div>
            <img src="/images/stardew valley.png" className='img-fluid shadow-4' alt='...' />
      </div>

      <Link to='/posts'><button>Back</button> </Link>

    </div>
  )
}

export default PostDetailsPage