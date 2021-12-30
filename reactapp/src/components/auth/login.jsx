import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import { NavLink, Redirect } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import { Button, Icon, Form, Input } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';
import '../css/main.css';
import 'react-toastify/dist/ReactToastify.css';


function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const dispatch = useDispatch()

    Login.propTypes = {
        login: PropTypes.func.isRequired,
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

    const onSubmit = (e) => {

        if (validate(e)) {
            e.preventDefault();
            props.login(username, password);
            console.log("login");
        }


        console.log(usernameErr)
    }

    const validate = (e) => {
        let status = true
        if (e.target.username.value === null || e.target.username.value === '') {
            setUsernameErr(true)
            notify('Username is required.')
            status = false
        }
        if (e.target.password.value === null || e.target.password.value === '') {
            setPasswordErr(true)
            notify('Password is required.')
            status = false
        }
        return status
    }


    useEffect(() => {
        console.log(props)
        if (props.errMsg !== null) {
            notify(props.errMsg)
            dispatch({ type: "refresh" })
        }
    }, [props.errMsg])

    if (props.isAuthenticated) {
        return <Redirect to="/" />;
    }




    return (
        <Container className=" rounded auth-style" style={{ maxWidth: "576px" }}>

            <Form onSubmit={onSubmit} >
                <h1>Login</h1>
                <Form.Field required={true}
                    error={usernameErr}

                    className="form-group">
                    <label>Username</label>
                    <input placeholder='Username' name='username'
                        className="form-control"
                        onChange={(e) => {
                            setUsernameErr(false);
                            setUsername(e.target.value)
                        }}

                        value={username} />
                </Form.Field>
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
                <Button color='violet' animated>
                    <Button.Content visible>Submit</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button>
                <p>Don't have an account?  <NavLink to="/register">Register</NavLink></p>
            </Form>
            <ToastContainer position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false} />
        </Container>
    )
}

const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.token !== null,
        errMsg: state.auth.errMsg
    }
)

export default connect(mapStateToProps, { login })(Login);