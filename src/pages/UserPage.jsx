import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function UserPage() {

  const { userId } = useParams()  
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  
  const API_URL = "http://localhost:5005";

  useEffect(() => {
    axios.get(`${API_URL}/user/${userId}`)
      .then(function (response) {
        setUser(response.data)
      }).catch(function (error) {
        setError(`Error - ${error.message}`)
      })

    console.log(user)
  }, [])

  return (
    <div id='users'>

      <h3>Hello</h3>

    </div>
  )
}

export default UserPage