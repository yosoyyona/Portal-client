import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";
import { Pane, TextInputField, TextareaField, SelectField, Button } from 'evergreen-ui'

const API_URL = "https://vast-jade-woodpecker-sock.cyclic.app";

function PostEditPage(props) {
  
  const { postId } = useParams()
  const { user } = useContext(AuthContext)

  const navigate = useNavigate()
  const storedToken = localStorage.getItem('authToken');

  const [title, setTitle] = useState('')
  const [gameName, setGameName] = useState('')
  const [genre, setGenre] = useState("")
  const [review, setReview] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [rating, setRating] = useState(0)

  // retrieve post data
  useEffect(() => {
    axios.get(`${API_URL}/posts/${postId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      const onePost = response.data
      setTitle(onePost.title)
      setGameName(onePost.gameName)
      setGenre(onePost.genre)
      setReview(onePost.review)
      setImageUrl(onePost.imageUrl)
      setRating(onePost.rating)
    })
    .catch((error) => console.log(error))
  }, [postId])

  const handleFileUpload = (e) => {
    
    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new post in POST route
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData,
        { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
    }; 

  const handleFormSubmit = (e) => {
    
    e.preventDefault()
    const requestBody = { title, gameName, genre, review, imageUrl, rating, author:user._id}

    axios.put(`${API_URL}/posts/${postId}/edit`, requestBody,
    { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => {
      navigate(`/posts/${postId}`)
    }).catch((err) => console.log(err));
  }

  const deletePost = (postId) => {

    axios.delete(`${API_URL}/posts/${postId}`,
    { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(response => {
      const deletePost = response.data
      navigate('/posts')
    }).catch(err => {
      console.error(err)
    })
  }

  return (
    <div>
      <h2> Edit your Post </h2>
      <Pane display="flex" marginLeft="3rem" marginRight="3rem">
        <Pane flex={1} alignItems="center" display="flex">
          <Link to={`/posts/${postId}`}><Button size="small" appearance="primary">To Post List</Button></Link>
        </Pane>
        <Pane>
          <Button size="small" marginBottom={5} intent="danger" onClick={() => deletePost(postId)}>Delete</Button>
        </Pane>
      </Pane>

      <div style={{display:'flex', alignItems:'center', flexDirection:'column', paddingTop:'20px'}}>
        <form onSubmit={handleFormSubmit} style={{width:'70vw'}}>

        <TextInputField
          required isInvalid={false}
          label="Title"
          name='title'
          type='text'
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextInputField
        required isInvalid={false}
          label="Game Name"
          name='gameName'
          type='text'
          onChange={(e) => setGameName(e.target.value)}
          defaultValue={gameName}
          
        /> {/* connecting to API? */}

        <SelectField
          label="Genre of the game"
          name="genre"
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="MMO">MMO</option>
          <option value="Puzzle">Puzzle</option>
          <option value="RolePlaying">Role-playing</option>
          <option value="Simulation">Simulation</option>
          <option value="Sports">Sports</option>
          <option value="Strategy">Strategy</option>
          <option value="ETC">ETC</option>
        </SelectField>

        <TextareaField
          required isInvalid={false}
          label="Review"
          name='review'
          type='text'
          defaultValue={review}
          onChange={(e) => setReview(e.target.value)}
        />

        {/* image */}
        <input type="file" onChange={(e) => handleFileUpload(e)} />

        {/* star rating */}
        <SelectField
          label="Rating"
          name="rating"
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="0">☆☆☆☆☆</option>
          <option value="1">★☆☆☆☆</option>
          <option value="2">★★☆☆☆</option>
          <option value="3">★★★☆☆</option>
          <option value="4">★★★★☆</option>
          <option value="5">★★★★★</option>
        </SelectField>

        <Button type="submit">Submit</Button>
        </form>
      </div>
      

    </div>
  )
}

export default PostEditPage