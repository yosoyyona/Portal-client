import React from 'react'
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";

const API_URL = "http://localhost:5005";

function PostEditPage(props) {

  const [post, setPost] = useState([])

  const { postId } = useParams()

  const { user } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${API_URL}/posts/${postId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => setPost(response.data))
    .catch((error) => console.log(error))
  }, [])

  

  return (
    <div>
hello
    </div>
  )
}

export default PostEditPage