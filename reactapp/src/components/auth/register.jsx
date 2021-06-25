import React from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
export default function Register() {
    return (
        <div>
            <Container>
                <form method='post' >
                    <h1>Register</h1>
                    <div class="mb-3">
                        <label for="usernameInput" class="form-label">Username</label>
                        <input type="text" class="form-control" name="username" id="usernameInput" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" name="password" id="exampleInputPassword1" />
                    </div>

                    <button type="submit" class="btn btn-primary mb-3">Submit</button>
                    <p>Already have an account?  <NavLink to="/login">Login</NavLink></p>
                </form>
            </Container>
        </div>
    )
}
