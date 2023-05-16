import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { TextInputField, TextareaField, Button } from 'evergreen-ui'

const API_URL = "http://localhost:5005";

const UserEditPage = () => {

  const { userId } = useParams()
  const { user } = useContext(AuthContext)

  const navigate = useNavigate()
  const storedToken = localStorage.getItem('authToken');
  
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    axios.get(`${API_URL}/user/${userId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      const userInfo = response.data
      setName(userInfo.name)
      setDescription(userInfo.description)
    })
    .catch((error) => console.log(error))
  }, [userId])

  const handleFormSubmit = (e) => {
    
    e.preventDefault()
    const requestBody = { name, description }

    axios.put(`${API_URL}/user/${userId}/edit`, requestBody,
    { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => {
      navigate(`/user/${userId}`)
    }).catch((err) => console.log(err));
  }

  return (
    <div>
      <h2> Edit your info </h2>
      <form onSubmit={handleFormSubmit}>
        <TextInputField
          required isInvalid={false}
          label="Name"
          name='name'
          type='text'
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          validationMessage="This field is required"
        />

        <TextareaField
          required isInvalid={false}
          label="Description"
          name='description'
          type='text'
          defaultValue={description}
          validationMessage="This field is required"
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button type="submit">Submit</Button>
      </form>
      
    </div>
  )
}

export default UserEditPage