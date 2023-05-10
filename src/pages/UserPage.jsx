import React, { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import axios from 'axios'

function UserPage() {

  const { userId } = useParams()  
  const [error, setError] = useState(null)
  
  const { user } = useContext(AuthContext)
  
  return (
    <div id='user'>

      <h3>Hello, {user.name}</h3>

    </div>
  )
}

export default UserPage