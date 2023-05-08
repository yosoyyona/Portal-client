import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  return (
    <div>
      <Link to="/posts">
        <button>Post</button>
      </Link>
      <Link to="/quizzes">
        <button>Quiz</button>
      </Link>
    </div>
  )
}

export default HomePage