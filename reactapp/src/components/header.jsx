import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import './css/header.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

function Header() {


    // const { isAuthenticated, user } = props.auth;
    // const authLinks = (
    //     <Nav className="justify-content-end" style={{ width: "100%", paddingRight: 19 }}>
    //         <Nav.Link>
    //             <a onClick={() => { props.logout(); dispatch({ type: LogoutSuccess }) }} style={{ textDecoration: "none" }}  >
    //                 Logout</a>
    //         </Nav.Link>

    //     </Nav>
    // );
    const guestLinks = (
        <Nav className="justify-content-end" style={{ width: "100%", paddingRight: 19 }}>
            <Nav.Link>
                <NavLink style={{ textDecoration: "none" }} to="/register">Register</NavLink>
            </Nav.Link>
            <Nav.Link>
                <NavLink style={{ textDecoration: "none" }} to="/login">Login</NavLink>
            </Nav.Link>

        </Nav>
    );
    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="home">E SHOPP</Navbar.Brand>

            <Nav className="mr-auto" className="justify-content-end" style={{ width: "100%", paddingRight: 19 }}>
                <Nav.Link>
                    <NavLink style={{ textDecoration: "none" }} to="/register" >Register</NavLink>
                </Nav.Link>
                <Nav.Link>
                    <NavLink style={{ textDecoration: "none" }} to="/login">Login</NavLink>
                </Nav.Link>
            </Nav>

        </Navbar>



    )
}

export default Header;
