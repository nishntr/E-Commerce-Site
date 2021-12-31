import { Container } from 'react-bootstrap'
import { NavLink, Redirect } from 'react-router-dom'
import { register } from '../../actions/auth';
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux';
import { Button, Icon, Form } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'
import '../css/main.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';


function Register(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [usernameErr, setUsernameErr] = useState(false);
    const [nameErr, setNameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [password2Err, setPassword2Err] = useState(false);
    const dispatch = useDispatch()

    Register.propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    const notify = (msg) => {
        console.log("toast")
        toast.error(msg, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }

    useEffect(() => {
        console.log(props)
        if (props.errMsg !== null) {
            notify(props.errMsg)
            dispatch({ type: "refresh" })
        }
    }, [props.errMsg])

    const handleSubmit = (e) => {

        if (validate(e)) {
            e.preventDefault();
            if (password !== password2) {
                console.log("Passwords do not match")
                notify('Passwords do not match.')
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
    }

    const validate = (e) => {
        let status = true
        if (e.target.username.value === null || e.target.username.value === '') {
            setUsernameErr(true)
            notify('Username is required.')
            status = false
        }
        if (e.target.name.value === null || e.target.name.value === '') {
            setNameErr(true)
            notify('Name is required.')
            status = false
        }
        if (e.target.email.value === null || e.target.email.value === '') {
            setEmailErr(true)
            notify('Email is required.')
            status = false
        }
        if (e.target.password.value === null || e.target.password.value === '') {
            setPasswordErr(true)
            notify('Password is required.')
            status = false
        }
        if (e.target.password2.value === null || e.target.password2.value === '') {
            setPassword2Err(true)
            notify('Please confirm password.')
            status = false
        }
        return status
    }

    if (props.isAuthenticated) {
        return <Redirect to="/" />;
    }
    return (
        <div>
            <Container className=" rounded auth-style  " style={{ maxWidth: "576px" }}>
                <Form onSubmit={handleSubmit} >
                    <h1>Register</h1>
                    <Form.Field error={nameErr}>
                        <label>Name</label>
                        <input placeholder='Name' name='name'
                            onChange={(e) => {
                                setNameErr(false);
                                setName(e.target.value)
                            }}
                            value={name} />
                    </Form.Field>

                    <Form.Field error={usernameErr}>
                        <label>Username</label>
                        <input placeholder='Username' name='username'
                            onChange={(e) => {
                                setUsernameErr(false);
                                setUsername(e.target.value)
                            }} value={username} />
                    </Form.Field>

                    <Form.Field error={emailErr}>
                        <label>Email Address</label>
                        <input placeholder='Email Address' name='email'
                            type="email"
                            onChange={(e) => {
                                setEmailErr(false);
                                setEmail(e.target.value)
                            }}
                            value={email} />
                    </Form.Field>

                    <Form.Group widths='equal'>
                        {/* <Form.Input error={passwordErr}  fluid label='Password' placeholder='Password'
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />
                             */}
                        <Form.Field required={true} error={passwordErr} className="form-group">
                            <label>Password</label>
                            <input placeholder='Password'
                                name='password'
                                type="password" className="form-control"
                                onChange={(e) => {
                                    setPasswordErr(false);
                                    setPassword(e.target.value)
                                }}
                                value={password}
                            />
                        </Form.Field>
                        <Form.Field required={true} error={password2Err} className="form-group">
                            <label>Password</label>
                            <input placeholder='Comfirm Password'
                                name='password2'
                                type="password" className="form-control"
                                onChange={(e) => {
                                    setPassword2Err(false);
                                    setPassword2(e.target.value)
                                }}
                                value={password2}
                            />
                        </Form.Field>
                        {/* <Form.Input error={password2Err} fluid label='Confirm Password' placeholder='Confirm Password'
                            type="password"
                            onChange={(e) => setPassword2(e.target.value)}
                            value={password2} /> */}
                    </Form.Group>

                    <Button color='violet' animated>
                        <Button.Content visible>Register</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow right' />
                        </Button.Content>
                    </Button>
                    <p>Already have an account?  <NavLink to="/login">Login</NavLink></p>
                </Form>


                <ToastContainer position="bottom-center"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false} />
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null,
    errMsg: state.auth.errMsg
})

export default connect(mapStateToProps, { register })(Register);