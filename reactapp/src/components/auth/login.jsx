import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

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
        <div>
            <Container className="m-3 w-50 ">
                <h1>Login</h1>
                <form onSubmit={onSubmit}>
                    <div className="form-group mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text" className="form-control"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password" className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mb-3">Submit</button>
                    <p>Don't have an account?  <NavLink to="/register">Register</NavLink></p>
                </form>
            </Container>
        </div>
    )
}

const mapStateToProps = state => (
    { isAuthenticated: state.auth.isAuthenticated }
)

export default connect(mapStateToProps, { login })(Login);