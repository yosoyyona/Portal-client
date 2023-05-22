import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button } from 'evergreen-ui'
import Post from '../components/Post'

const API_URL = "http://localhost:5005";

function PostPage() {
  const [posts, setPosts] = useState([])
  const [sortedPost, setSortedPost] = useState([])
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const storedToken = localStorage.getItem('authToken');

  const getAllPost = () => {
    axios.get(`${API_URL}/posts`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      setPosts(response.data)
      
    })
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    getAllPost()

  }, [])

  

  return (
    <div>
        
      {isLoggedIn && 
      <div>
        <Link to="/posts/create"><Button>Create Post</Button></Link>
        <div id="post-list">
          {posts.map(post => 
          <Post key={post._id} post={post} />
          )}
        </div>
      </div>
        
      }

      {
        !posts.length && <></>
      }

      {!isLoggedIn && (
        <div className="d-flex p-3">
        {posts.map(post => 
        <Post key={post._id} post={post}></Post>
        )}
      </div>
      )}

      

    </div>
  )
}

export default PostPage