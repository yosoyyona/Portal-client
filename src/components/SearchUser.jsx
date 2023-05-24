import React from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Card } from 'evergreen-ui'

const SearchUser = ({user}) => {
  
  return (
    <Container style={{display:'flex', alignItems:"center", justifyContent:"center"}}>
      <Card elevation={1} 
        width="70vw"
        height="auto"
        margin={10}
        padding={15}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Link to={`/user/${user._id}`}>
          <h4>{user.name}</h4>
          {user.description&&
            <h5>{user.description}</h5>
          }
        </Link>
      </Card>
    </Container>
  )
}

export default SearchUser