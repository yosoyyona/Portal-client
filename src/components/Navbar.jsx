import React from 'react'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Pane, Heading, Button } from 'evergreen-ui'

function NavBar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
      <Pane display="flex" padding={16} background="tint2" borderRadius={3} marginBottom={10}>
        <Pane flex={1} alignItems="center" display="flex">
          <Heading size={600} ><Link to="/">Home</Link></Heading>
        </Pane>

        <Pane>
          {isLoggedIn && (
            <>        
              <Link to={`/user/${user._id}`}><Button marginRight={3} size="small">Profile</Button></Link>
              <Button onClick={logOutUser} size="small">Logout</Button>
            </>
          )}
            
          {!isLoggedIn && (
            <>
              <Link to="/signup"> <Button marginRight={3} size="small">Sign Up</Button> </Link>
              <Link to="/login"> <Button size="small">Login</Button> </Link>
            </>
          )}
        </Pane>
      </Pane>
  )
}

export default NavBar