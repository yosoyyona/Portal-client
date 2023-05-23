import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Pane, Button, TextInputField } from 'evergreen-ui'
import axios from "axios";

const API_URL = "https://portal-project.netlify.app/";


function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken );

        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');   
      })
      .catch((error) => {
        console.log(error)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  
  return (
    <Pane className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <TextInputField
          required isInvalid={false}
          label="Email"
          name='email'
          type="email"
          value={email}
          onChange={handleEmail}
          validationMessage="This field is required"
        />

        <TextInputField
          required isInvalid={false}
          label="Password"
          name='password'
          type="password"
          value={password}
          onChange={handlePassword}
          validationMessage="This field is required"
        />

        <Button type="submit">Login</Button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </Pane>
  )
}

export default LoginPage;