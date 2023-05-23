import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from "react-router-dom";
import SearchPost from '../components/SearchPost';
import SearchQuiz from '../components/SearchQuiz';
import SearchUser from '../components/SearchUser';
import { Pane, SearchInput } from 'evergreen-ui'
import axios from "axios";

const API_URL = "https://portal-project.netlify.app";

const SearchPage = () => {

  const [results, setResults] = useState([])

  let [searchParams, setSearchParams] = useSearchParams();
  let [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const storedToken = localStorage.getItem('authToken');

  const handleSearch = e => {
    const lowercaseKeyword = e.target.value.toLowerCase()
    setSearchParams({keyword: lowercaseKeyword})
    setKeyword(lowercaseKeyword)
  }

  const getResult = () => {
    axios.get(`${API_URL}/search`,
      { headers: { Authorization: `Bearer ${storedToken}` }, params: {keyword: keyword}}
    )
    .then((response) => {
      if(response.data) setResults(response.data)
    })
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    if(!keyword == "") getResult()
  }, [keyword])

  return (
    <div>
      <form role="search" className='mb-3'>
        <SearchInput type="text" value={keyword} onChange={handleSearch} placeholder="Search..." />
      </form>
      
      { !keyword == "" &&
        <div>
          <h4> Search Result with "{keyword}" </h4>
          <hr />
        </div>
      }

      { results.posts && 
        <div>
          <h4>Post</h4> 
          <div id="post-list">
            {results.posts.map(post => <SearchPost key={post._id} post={post}/>)}
          </div>
          <hr />
        </div>
      }
      { results.quizzes && 
        <div>
          <h4>Quiz</h4> 
          <div id="quiz-list">
            {results.quizzes.map(quiz => <SearchQuiz key={quiz._id} quiz={quiz} />)}
          </div>
          <hr />
        </div>
      }
      { results.users && 
        <div>
          <h4>User</h4> 
          <div id="user-list">
            {results.users.map(user => <SearchUser key={user._id} user={user} />)}
          </div>
          <hr />
        </div>
      }
      
      
    </div>
  )
}

export default SearchPage