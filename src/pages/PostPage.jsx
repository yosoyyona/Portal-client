import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Pane, Button, Heading } from 'evergreen-ui'
import Post from '../components/Post'

function PostPage() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [filteredPosts, setFilteredPosts] = useState([])
  const [backButtonStyle, setBackButtonStyle] = useState("")
  const [nextButtonStyle, setNextButtonStyle] = useState("")
  
  const API_URL = "https://vast-jade-woodpecker-sock.cyclic.app";
  const { isLoggedIn } = useContext(AuthContext);
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${API_URL}/posts`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      const reversedPosts = response.data.reverse();
      setPosts(reversedPosts);
      setFilteredPosts(pagination(page, reversedPosts));
    })
    .catch((error) => console.log(error))
  }, [])


  const displayButtons = (backButton, nextButton) => {
    if (backButton) setBackButtonStyle("visible")
    else setBackButtonStyle("disabled")
    if (nextButton) setNextButtonStyle("visible")
    else setNextButtonStyle("disabled")
  }

  const setCurrentPage = (currentPage) => {

    if (posts.length <= 5) displayButtons(false, false)
    else {
      setPage(currentPage)

      if (currentPage == 1) displayButtons(false, true)
      else if (currentPage * 5 > posts.length) displayButtons(true, false)
      else displayButtons(true, true) 
    }
  }

  useEffect(() => {
    setCurrentPage(page)
  }, [])

  useEffect(() => {
    setFilteredPosts(pagination(page, posts))
  }, [page, posts])

  const pagination = (page, posts) => posts.slice((page - 1) * 5, page * 5)

  return (
    <div>
      
      <Pane display="flex" padding={16} marginLeft="3rem" marginRight="3rem">
        <Pane flex={1} alignItems="center" display="flex">
          <Link to='/'><Button size="small" appearance="primary">Back</Button></Link>
        </Pane>
        <Pane>
          {isLoggedIn && 
            <Link to="/posts/create"><Button size="small">Create Post</Button></Link>
          }
        </Pane>
      </Pane>

      {
        filteredPosts.length > 0 ?
          <div id="post-list">
            {filteredPosts.map(post => <Post key={post._id} post={post} />)}
          </div>
          : <Heading size={700}>Loading...</Heading>
      }

      {
        posts.length > 5 &&
        <div>
          <Heading size={400} marginBottom="10px">Page {page}</Heading>
        </div>
      }

      <Button className={backButtonStyle} onClick={() => { setCurrentPage(page - 1) }} size="small" marginRight="8px">Back</Button>
      <Button className={nextButtonStyle} onClick={() => { setCurrentPage(page + 1) }} size="small">Next</Button>

    </div>
  )
}

export default PostPage