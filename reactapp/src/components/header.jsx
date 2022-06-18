import React from 'react'
import { connect, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'

import './css/header.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Icon } from 'semantic-ui-react';
import { logout } from '../actions/auth';
import { getProducts } from '../actions/products';

function Header(props) {

    Header.propTypes = {
        auth: PropTypes.object.isRequired,
        getProducts: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
    }

    const dispatch = useDispatch();


    // const { isAuthenticated, user } = props.auth;
    const isAuthenticated = (props.auth.token !== null)
    const authLinks = (
        <Nav className="justify-content-end" style={{ width: "100%", paddingRight: 19 }}>
            <Nav.Link   >
                <NavLink style={{ textDecoration: "none" }}
                    // onClick={() => props.getProducts()}
                    to="/cart">
                    <Icon name='shopping cart' />Cart
                </NavLink>
            </Nav.Link>
            <Nav.Link   >
                <NavLink style={{ textDecoration: "none" }} to="/orders">
                    <Icon name='clipboard list' />Orders
                </NavLink>
            </Nav.Link>
            <Nav.Link onClick={() => { props.logout(); dispatch({ type: "LogoutSuccess" }) }} style={{ textDecoration: "none" }} >
                Logout
            </Nav.Link>

        </Nav>
    );
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
        <Navbar sticky="top" className="nav-style">
            <Navbar.Brand href="/"> <Icon name='shopping bag' />
                E SHOPP</Navbar.Brand>

            {isAuthenticated ? authLinks : guestLinks}

        </Navbar>

    )
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout, getProducts })(Header);