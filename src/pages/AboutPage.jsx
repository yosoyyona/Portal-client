import React from 'react'
import { Link } from 'react-router-dom'
import { Pane, Heading } from 'evergreen-ui'

const AboutPage = () => {
  return (
    <div style={{marginTop:'50px', marginLeft:'10rem', marginRight:'10rem'}}>
      <Heading size={900} marginBottom='20px'>Portal</Heading>
      <Heading size={700} marginBottom='10px'>is a place to talk about videogames </Heading>
      <Heading size={600} >is full-stack web app of our third project </Heading>
      
      <Heading size={800} marginTop='100px' marginBottom='20px'>Who created Portal</Heading>
      <Heading size={600} marginBottom='10px'><Link to={`/user/645f648a98746513db57e357`}>Apolline✨</Link></Heading>
      <Heading size={600} ><Link to={`/user/646d144472b00cf793e86d6d`}>Yona🍊</Link></Heading>
      
    </div>
  )
}

export default AboutPage