import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Button, Icon, Form } from 'semantic-ui-react'

import '../css/auth.css';


function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    Login.propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }
    const onSubmit = (e) => {
        e.preventDefault();
        props.login(username, password);
        console.log("login");
    }

    if (props.isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <Container className=" rounded auth-style" style={{ maxWidth: "576px" }}>

            <Form onSubmit={onSubmit}>
                <h1>Login</h1>
                <Form.Field className="form-group">
                    <label>Username</label>
                    <input placeholder='Username' className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username} />
                </Form.Field>
                <Form.Field className="form-group">
                    <label>Password</label>
                    <input placeholder='Password'
                        type="password" className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </Form.Field>
                <Button color='violet' animated>
                    <Button.Content visible>Submit</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button>
                <p>Don't have an account?  <NavLink to="/register">Register</NavLink></p>
            </Form>

        </Container>
    )
}

const mapStateToProps = state => (
    { isAuthenticated: state.auth.token !== null }
)

export default connect(mapStateToProps, { login })(Login);