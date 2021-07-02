import { Container } from 'react-bootstrap'
import { NavLink, Redirect } from 'react-router-dom'
import { register } from '../../actions/auth';
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Button, Icon, Form } from 'semantic-ui-react'

import '../css/auth.css';


function Register(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    Register.propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            console.log("Passwords do not match")
        } else {
            const newUser = {
                username,
                name,
                email,
                password,
            };
            console.log(newUser);
            props.register(newUser);
        }
    }

    if (props.isAuthenticated) {
        return <Redirect to="/" />;
    }
    return (
        <div>
            <Container className=" rounded auth-style  " >
                <Form onSubmit={handleSubmit} >
                    <h1>Register</h1>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name'
                            onChange={(e) => setName(e.target.value)}
                            value={name} />
                    </Form.Field>

                    <Form.Field>
                        <label>Username</label>
                        <input placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                            value={username} />
                    </Form.Field>

                    <Form.Field>
                        <label>Email Address</label>
                        <input placeholder='Email Address'
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />
                    </Form.Field>

                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Password' placeholder='Password'
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />
                        <Form.Input fluid label='Confirm Password' placeholder='Confirm Password'
                            type="password"
                            onChange={(e) => setPassword2(e.target.value)}
                            value={password2} />
                    </Form.Group>

                    <Button color='violet' animated>
                        <Button.Content visible>Register</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow right' />
                        </Button.Content>
                    </Button>
                    <p>Already have an account?  <NavLink to="/login">Login</NavLink></p>
                </Form>



            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
})

export default connect(mapStateToProps, { register })(Register);