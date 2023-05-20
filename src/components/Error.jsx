import React from 'react'
import { Link } from "react-router-dom";
import { Pane, Button  } from 'evergreen-ui'

function Error({error}) {
  return (
    <div className='error-message'>
      <Pane display="flex" padding={16}>
        <Pane flex={1} alignItems="center" display="flex">
          <Link to='/'><Button size="small" appearance="primary">Back</Button></Link>
        </Pane>
      </Pane>
      <h4>There is an error.</h4>
      <h5>{error}</h5>
    </div>
  )
}

export default Error