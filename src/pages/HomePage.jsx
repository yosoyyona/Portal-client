import { Link, useNavigate } from "react-router-dom";
import { Button, Pane, majorScale } from 'evergreen-ui'


function HomePage() {
  return (
    
    <Pane alignItems="center" marginX={majorScale(2)}>

      <Pane height={180} width={240} display="flex" alignItems="center" justifyContent="center" border="default">
        <Link to="/posts">
          Post
        </Link>
      </Pane>  
      <Pane height={180} width={240} display="flex" alignItems="center" justifyContent="center" border="default">
        <Link to="/quizzes">
          Quiz
        </Link>
        
      </Pane>
      
    </Pane>

  )
}

export default HomePage