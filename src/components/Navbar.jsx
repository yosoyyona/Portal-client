import React from 'react'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <nav>
        <Link to="/">
            <button>Home</button>
        </Link>

        {isLoggedIn && (
        <>        
          <button>Logout</button>
        </>
      )}

        
        {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}
    </nav>
  )
}

export default Navbar