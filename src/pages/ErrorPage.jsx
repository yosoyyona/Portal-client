import React from 'react'
import { Link } from "react-router-dom";
import { Pane, Heading, Button  } from 'evergreen-ui'

function ErrorPage() {
  return (
    <div className='error-message'>
      <Pane display="flex" padding={16} marginLeft="3rem" marginRight="3rem">
        <Pane flex={1} alignItems="center" display="flex">
          <Link to='/'><Button size="small" appearance="primary">Back</Button></Link>
        </Pane>
      </Pane>
      
      <Heading size={900}>*404*</Heading>
      <Heading size={800} marginBottom="20px">Page not found</Heading>

      <img src='https://http.cat/404' style={{maxWidth:'40rem', width:'100%', height:'auto', borderRadius:'10px'}} className='img-fluid shadow-4' alt='...' />

    </div>
  )
}

export default ErrorPage