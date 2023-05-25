import React from 'react'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Popover, Position, Menu, Pane, Heading, Button } from 'evergreen-ui'

function NavBar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
      <Pane display="flex" className="navbar" padding={16} background="tint2" borderRadius={3} marginBottom={10}>
        <Pane flex={1} alignItems="center" display="flex">
          
          <Popover
            position={Position.BOTTOM_LEFT}
            content={
              <Menu>
                <Menu.Group>
                  <Menu.Item><Link to="/">Home</Link></Menu.Item>
                  <Menu.Item><Link to="/posts">Post</Link></Menu.Item>
                  <Menu.Item><Link to="/quizzes">Quiz</Link></Menu.Item>
                  <Menu.Item><Link to="/search">Search</Link></Menu.Item>
                </Menu.Group>
                <Menu.Divider />
                <Menu.Group>
                <Link to="/about"><Menu.Item intent="success">About</Menu.Item></Link>
                </Menu.Group>
              </Menu>
            }
          >
            <Heading size={600} >Portal</Heading>
          </Popover>
        </Pane>

        <Pane>
          {isLoggedIn && (
            <>        
              <Link to={`/user/${user._id}`}><Button marginRight={5} size="small">Profile</Button></Link>
              <Button onClick={logOutUser} size="small">Logout</Button>
            </>
          )}
            
          {!isLoggedIn && (
            <>
              <Link to="/signup"> <Button marginRight={5} size="small">Sign Up</Button> </Link>
              <Link to="/login"> <Button size="small">Login</Button> </Link>
            </>
          )}
        </Pane>
      </Pane>
  )
}

export default NavBar