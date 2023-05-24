import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button } from 'evergreen-ui'
import Post from '../components/Post'

const API_URL = "https://vast-jade-woodpecker-sock.cyclic.app";

function PostPage() {
  const [posts, setPosts] = useState([])
  const { isLoggedIn } = useContext(AuthContext);

  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${API_URL}/posts`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => 
      setPosts(response.data.reverse()))
    .catch((error) => console.log(error))
  }, [])

  return (
    <div>
        
      {isLoggedIn && 
        <div>
          <Link to="/posts/create"><Button size="small">Create Post</Button></Link>
        </div>
      }

      {
        !posts.length && <></>
      }

      <div id="post-list">
        {posts.map(post => <Post key={post._id} post={post} />)}
      </div>

    </div>
  )
}

export default PostPage