import { Link, useNavigate } from "react-router-dom";
import { Heading, Pane, majorScale } from 'evergreen-ui'


function HomePage() {
  return (
    
    <Pane alignItems="center" justifyContent='center' textAlign='center' marginX={majorScale(2)}>

      <div style={{display:'flex', maxWidth:'80vw', alignItems:'center', flexDirection:'column', paddingTop:'20px'}}>
        
        <Link to="/posts">
          <Pane width="50vw" height="15rem" marginBottom='8px' display="flex" alignItems="center" justifyContent="center" border="default">
            <Heading size={700} color="747bff">Post</Heading>
          </Pane>  
        </Link>

        <Link to="/quizzes">
          <Pane width="50vw" height="15rem" marginBottom='8px' display="flex" alignItems="center" justifyContent="center" border="default">
            <Heading size={700} color="747bff">Quiz</Heading>
          </Pane>  
        </Link>

        <Link to="/search">
          <Pane width="50vw" height="15rem" marginBottom='8px' display="flex" alignItems="center" justifyContent="center" border="default">
            <Heading size={700} color="747bff">Search</Heading>
          </Pane>
        </Link>
      </div>
      
    </Pane>

  )
}

export default HomePage