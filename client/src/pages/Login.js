import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { Form, Button, Container, } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container className='w-50 d-flex justify-content-center'>
      <Form className='text-center w-50 d-flex flex-wrap align-items-center flex-column' onSubmit={handleFormSubmit}>
        <Form.Text>
          <h1 class="text-center mb-3"><FaUser /> Login</h1>
        </Form.Text>
        <Form.Group className="mb-3 w-100">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" id="email" name="email" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3 w-100">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" id="pwd" onChange={handleChange} />
        </Form.Group>
        <Form.Text className="text-muted">
          {error ? (
            <div>
              <p className="error-text">Could not find an account with those credentials</p>
            </div>
          ) : null}
        </Form.Text>
        <Button className="w-50" variant="primary" type="submit">
          Submit
        </Button>
        <Form.Text className="text-muted">
          <p class="lead mt-4">
            No Account? <Link to="/signup">← Go to Signup</Link>
          </p>
        </Form.Text>

      </Form>

    </Container >

  );
}

export default Login;