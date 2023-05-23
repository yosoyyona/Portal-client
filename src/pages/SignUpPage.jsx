import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pane, Button, TextInputField } from 'evergreen-ui'
import axios from "axios";

const API_URL = "https://portal-project.netlify.app";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { name, email, password };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <Pane className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <TextInputField
          required isInvalid={false}
          label="Name"
          name='name'
          type="text"
          value={name}
          onChange={handleName}
          validationMessage="This field is required"
        />

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
          hint="Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter."
          value={password}
          onChange={handlePassword}
          validationMessage="This field is required"
        />
        <Button type="submit">Sign Up</Button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </Pane>
  );
}

export default SignupPage;