import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { Form, Button, Container, } from 'react-bootstrap'
import { FaUserPlus } from 'react-icons/fa';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                email: formState.email,
                password: formState.password,
                username: formState.username
            },
        });
        const token = mutationResponse.data.addUser.token;
        const username = mutationResponse.data.addUser.user.username;
        Auth.login(token, username);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <Container className='w-auto d-flex justify-content-center'>
            <Form className='text-center w-50 d-flex flex-wrap align-items-center flex-column log-form' onSubmit={handleFormSubmit}>
                <Form.Text>
                    <h1 className="text-center mb-3 log-header"><FaUserPlus /> Signup</h1>
                </Form.Text>

                <Form.Group className="mb-3 w-auto">
                    <Form.Label className='log-text'>Username</Form.Label>
                    <Form.Control type="username" placeholder="Username" id="username" name="username" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3 w-auto">
                    <Form.Label className='log-text'>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id="email" name="email" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3 w-auto">
                    <Form.Label className='log-text'>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" id="pwd" onChange={handleChange} />
                </Form.Group>
                <Button className="w-auto" id='log-button' type="submit">
                    Submit
                </Button>
                <Form.Text className="text-muted">
                    <div className="lead mt-2 w-auto">
                        <p className='mb-0 log-text'>
                            Have an account?
                        </p>
                        <Link className="log-goto" to="/login">← Go to Login</Link>
                    </div>
                </Form.Text>
            </Form>
        </Container >
    );
}

export default Signup;