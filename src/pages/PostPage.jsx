import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function PostPage() {
    const [post, setPost] = useState([])

    const getAllPost = () => {
        axios.get(`${API_URL}/posts`)
        .then((response) => setPost(response.data))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        getAllPost()
    }, [])
    return (
        <div>

            <Link to="/posts/create">Create Post</Link>

            {post.map((post) => {
            return(
                <div>
                    <Link to={`/posts/${post._id}`}>
                    <div>
                        <div>
                            <p>{post.title}</p>
                            <p>{post.gameName}</p>
                            <p>{post.genre}</p>
                        </div>
                        <img src={post.image}></img>
                    </div>
                    <p>{post.review}</p>
                    <div>
                        <p>{post.rating}</p>
                        <p>{post.author}</p>
                        <p>{post.date}</p>
                    </div>
                        
                    </Link>
                </div>
            )})}

        </div>
    )
}

export default PostPage