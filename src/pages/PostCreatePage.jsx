import React, { useState, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import { TextInputField, TextareaField, SelectField, Pane, FileUploader, FileCard, Button } from 'evergreen-ui'
import axios from 'axios'

const API_URL = "http://localhost:5005";

const PostCreatePage = () => {
  
  const [ post, setPost ] = useState([])
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  
  const handleSubmit = (e) => {
    
    e.preventDefault()
    const form = e.target

    const storedToken = localStorage.getItem('authToken');

    const requestBody = { 
      title: form.title.value, 
      author: user._id, 
      gameName: form.gameName.value, 
      genre: form.genre.value, 
      review: form.review.value, 
      // image: form.image.value, 
      rating: form.rating.value
    }
    console.log(requestBody)

    // 🍊 check!
    axios.post(`${API_URL}/api/posts`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        if (response.data) setPost(response.data)
      })
  }

  // file uploader for image
  /* const [files, setFiles] = useState([])
  const [fileRejections, setFileRejections] = useState([])
  const handleFileChange = useCallback((files) => setFiles([files[0]]), [])
  const handleRejected = useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
  const handleRemove = useCallback(() => {
    setFiles([])
    setFileRejections([])
  }, []) */

  return (
    <div>
      <h2> Create a post📝 </h2>

      <form onSubmit={handleSubmit}>

        <TextInputField
          required isInvalid={false}
          label="Title"
          name='title'
          type='text'
          validationMessage="This field is required"
        />
        
        <TextInputField
        required isInvalid={false}
          label="Game Name"
          name='gameName'
          type='text'
          validationMessage="This field is required"
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
          validationMessage="This field is required"
        />
        
        {/* file uploader for image
        <Pane maxWidth={654}>
          <FileUploader
            label="Upload Image"
            name="image"
            description="You can upload 1 file. File can be up to 50 MB."
            maxSizeInBytes={50 * 1024 ** 2}
            maxFiles={1}
            onChange={handleFileChange}
            onRejected={handleRejected}
            renderFile={(file) => {
              const { name, size, type } = file
              const fileRejection = fileRejections.find((fileRejection) => fileRejection.file === file)
              const { message } = fileRejection || {}
              return (
                <FileCard
                  key={name}
                  isInvalid={fileRejection != null}
                  name={name}
                  onRemove={handleRemove}
                  sizeInBytes={size}
                  type={type}
                  validationMessage={message}
                />
              )
            }}
            values={files}
          />
        </Pane> */}
        
        {/* star rating */}
        <SelectField
          label="Rating"
          name="rating"
        >
          <option value="0" selected>☆☆☆☆☆</option>
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

export default PostCreatePage