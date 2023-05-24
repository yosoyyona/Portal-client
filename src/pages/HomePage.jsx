import { Link, useNavigate } from "react-router-dom";
import { Button, Pane, majorScale } from 'evergreen-ui'


function HomePage() {
  return (
    
    <Pane alignItems="center" justifyContent='center' marginX={majorScale(2)}>

      <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
        <Pane height={150} width={240} marginBottom={5} display="flex" alignItems="center" justifyContent="center" border="default">
        <Link to="/posts">
          Post
        </Link>
      </Pane>  
      <Pane height={150} width={240} marginBottom={5} display="flex" alignItems="center" justifyContent="center" border="default">
        <Link to="/quizzes">
          Quiz
        </Link>
      </Pane>
      <Pane height={150} width={240} display="flex" alignItems="center" justifyContent="center" border="default">
        <Link to="/search">
          Search
        </Link>
      </Pane>
      </div>
      
    </Pane>

  )
}

export default HomePage