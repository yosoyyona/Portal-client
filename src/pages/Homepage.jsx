import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  return (
    <div>
      <Link to="/post">
        <button>Post</button>
      </Link>
      <Link to="/quizz">
        <button>Quizz</button>
      </Link>
    </div>
  )
}

export default HomePage