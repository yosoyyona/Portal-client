import React from 'react'
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = "http://localhost:5005";

function PostEditPage() {

  const { postId } = useParams()
  const navigate = useNavigate()

  

  return (
    <div>

    </div>
  )
}

export default PostEditPage