import React from 'react'
import { Link, useSearchParams } from "react-router-dom";

const SearchPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");
  
  // select between post, quiz, user
  const type = searchParams.get("type"); 
  

  function handleParams(event) {
    event.preventDefault();
    
    let params = serializeFormQuery(event.target);
    setSearchParams(params);
  }

  return (
    <div>SearchPage</div>
  )
}

export default SearchPage