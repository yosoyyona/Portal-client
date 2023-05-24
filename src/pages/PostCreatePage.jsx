import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import { Pane, TextInputField, TextareaField, SelectField, Button } from 'evergreen-ui'
import axios from 'axios'
import service from "../api/service";

const API_URL = "https://vast-jade-woodpecker-sock.cyclic.app";

const PostCreatePage = () => {
  
  const [ post, setPost ] = useState([])
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate()
  const storedToken = localStorage.getItem('authToken');
  const { user } = useContext(AuthContext)
  
    // ******** this method handles the file upload ********
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
      imageUrl,
      rating: form.rating.value
    }
    console.log(requestBody)

    // 🍊 check!
    axios.post(`${API_URL}/posts/create`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        if (response.data) setPost(response.data)
        navigate("/posts")
      })
  }

  return (
    <div>
      <h2> Create a post📝 </h2>
      <Pane display="flex" marginLeft="3rem" marginRight="3rem">
        <Pane flex={1} alignItems="center" display="flex">
          <Link to={`/posts`}><Button size="small" appearance="primary">Back</Button></Link>
        </Pane>
        <Pane></Pane>
      </Pane>

      <div style={{display:'flex', alignItems:'center', flexDirection:'column', paddingTop:'20px'}}>
        <form onSubmit={handleSubmit} style={{width:'70vw'}}>

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
      

    </div>
  )
}

export default PostCreatePage