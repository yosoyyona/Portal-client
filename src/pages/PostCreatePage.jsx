import React, { useState, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import { TextInputField, TextareaField, SelectField, FileUploader, Pane, Button } from 'evergreen-ui'
import axios from 'axios'

const PostCreatePage = () => {
  
  const [ post, setPost ] = useState([])

  const { user } = useContext(AuthContext)

  const navigate = useNavigate()


  const handleSubmit = (event) => {

    event.preventDefault()

    const form = event.target

    const newPost = { 
      title: form.title.value, 
      author: user._id, 
      gameName: form.gameName.value, 
      genre: form.genre.value, 
      review: form.review.value, 
      image, 
      rating 
    }
    console.log(newPost)

    // 🍊 check!
    axios.post(`http://localhost:5005/posts/`, newPost,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        if (response.data) {
          const newPosts = response.data
          setPost(newPosts)
        }
      })
  }

  // 🍊 check!
  const storedToken = localStorage.getItem('authToken');
  
  // file uploader for image
  const [files, setFiles] = useState([])
  const [fileRejections, setFileRejections] = useState([])
  const handleFileChange = useCallback((files) => setFiles([files[0]]), [])
  const handleRejected = useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
  const handleRemove = useCallback(() => {
    setFiles([])
    setFileRejections([])
  }, [])

  return (
    <div>
      <h1> Create a post📝 </h1>

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
          <option value="Action" selected>Action</option>
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
        </Pane>
        
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