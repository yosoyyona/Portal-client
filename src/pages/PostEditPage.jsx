import React from 'react'
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";
import { TextInputField, TextareaField, SelectField, Button } from 'evergreen-ui'

const API_URL = "http://localhost:5005";

function PostEditPage(props) {
  const [post, setPost] = useState([])

  const { postId } = useParams()
  const { user } = useContext(AuthContext)

  const navigate = useNavigate()
  const storedToken = localStorage.getItem('authToken');

  const [title, setTitle] = useState('')
  const [gameName, setGameName] = useState('')
  const [ genre, setGenre] = useState("")
  const [review, setReview] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [ rating, setRating] = useState(0)

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
    // console.log("The file to be uploaded is: ", e.target.files[0]);

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
    
    e.prevent.default()
    const requestBody = { title, gameName, genre, review, imageUrl, rating, author:user._id}

    axios.put(`${API_URL}/posts/${postId}/edit`, requestBody,
    { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => {
      console.log('edit?')
      navigate(`/posts/${postId}`)
    }).catch((err) => console.log(err));
  }

  

  return (
    <div>
      <h2> Edit your Post </h2>

      <form onSubmit={handleFormSubmit}>

        <TextInputField
          required isInvalid={false}
          label="Title"
          name='title'
          type='text'
          defaultValue={title}
          validationMessage="This field is required"
          
        />
        
        <TextInputField
        required isInvalid={false}
          label="Game Name"
          name='gameName'
          type='text'
          validationMessage="This field is required"
          defaultValue={gameName}
          
        /> {/* connecting to API? */}

        <SelectField
          label="Genre of the game"
          name="genre"
        >
          <option value="Action" defaultValue>Action</option>
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
          validationMessage="This field is required"
        />
        
        {/* image */}
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        
        {/* star rating */}
        <SelectField
          label="Rating"
          name="rating"
        >
          <option value="0" defaultValue>☆☆☆☆☆</option>
          <option value="1">★☆☆☆☆</option>
          <option value="2">★★☆☆☆</option>
          <option value="3">★★★☆☆</option>
          <option value="4">★★★★☆</option>
          <option value="5">★★★★★</option>
        </SelectField>

        <Button type="submit">Submit</Button>
      </form>

    </div>
  )
}

export default PostEditPage