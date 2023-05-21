import React, { useState, useEffect, useContext } from "react";
import Comment from '../components/Comment'
import { AuthContext } from "../context/auth.context";
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Pane, TextareaField, Button  } from 'evergreen-ui'
import axios from "axios";


function CommentPage() {

  const { postId } = useParams()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState([])

  /*const [authorId, setAuthorId] = useState([])
  const [userId, setUserId] = useState([])*/

  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem('authToken');


  useEffect(() => {
    axios.get(`${API_URL}/posts/${postId}/comments`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      setComments(response.data)
      //let [authorArray] = [...response.data.author]
      //setAuthorId(authorArray._id)
      //console.log(authorId)
    })
    .catch((error) => console.log(error))
  }, [newComment])


  // to create new comment
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target

    const requestBody = { 
      author: user._id, 
      message: form.message.value, 
      post: postId
    }

    e.target.reset()
    //console.log(requestBody)

    axios.post(`${API_URL}/posts/${postId}/comments`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        if (response.data) setNewComment(response.data)
        navigate(`/posts/${postId}`)
      })
      .catch((error) => console.log(error))
    }

  // delete comment

  const handleDelete = (commentId) => {

    axios.delete(`${API_URL}/posts/${postId}/comments/${commentId}`,
    { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(response => {
      if (response.data) setNewComment(response.data)
      navigate(`/posts/${postId}`)
    })
    .catch((error) => console.log(error))
  }


  return (
    <div>
      <div id="comments-list">
        <h4>Comments</h4>
        {comments &&
          comments.map(comment => <Comment key={comment._id} comment={comment} 
          handleDelete={() => handleDelete(comment._id)}
        />)}
      </div>
      
      <Pane display="flex" className="align-top" style={{display:'flex', justifyContent:'center'}}>
        <form  onSubmit={handleSubmit}>
          <TextareaField
            required isInvalid={false}
            label="Comment"
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

export default CommentPage