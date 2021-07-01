import { Container } from 'react-bootstrap'
import { NavLink, Redirect } from 'react-router-dom'
import { register } from '../../actions/auth';
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';



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
            <Container className="m-3 w-50 ">
                <form onSubmit={handleSubmit} >
                    <h1>Register</h1>
                    <div className="form-group mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text" className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text" className="form-control"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email" className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
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
                    <div className="form-group mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password" className="form-control"
                            onChange={(e) => setPassword2(e.target.value)}
                            value={password2}
                        />
                    </div>

                    <button type="submit" class="btn btn-primary mb-3">Register</button>
                    <p>Already have an account?  <NavLink to="/login">Login</NavLink></p>
                </form>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(Register);