import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from "react-router-dom";
import { Pane, SearchInput, Button } from 'evergreen-ui'
import axios from "axios";

const API_URL = "http://localhost:5005";

const SearchPage = () => {

  const [results, setResults] = useState([])

  let [searchParams, setSearchParams] = useSearchParams();
  let [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const storedToken = localStorage.getItem('authToken');

  const handleKeyword = e => {
    setSearchParams({keyword: e.target.value})
    setKeyword(e.target.value)
  }

  const getResult = () => {
    axios.get(`${API_URL}/search`,
      { headers: { Authorization: `Bearer ${storedToken}` }, params: {keyword: keyword}}
    )
    .then((response) => {
      console.log(response.data)
      if(response.data) setResults(response.data)
    })
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    if(!keyword.length == "") getResult()
  }, [keyword])

  return (
    <div>
      <form role="search">
        <SearchInput type="text" value={keyword} onChange={handleKeyword} placeholder="Enter a keyword" />
        
      </form>
      

      {results.length > 0 &&
        <div id="result-list">
          <h4>Searched result with "{keyword}"</h4> 
        
          {/* {results.map(result => <p>{result}</p>)} */}
        </div>
      }
      
    </div>
  )
}

export default SearchPage