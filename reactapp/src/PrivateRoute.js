import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, isAuth, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (auth.isLoading) {
                return <h2>Loading...</h2>;
            } else if (!isAuth) {
                return <Redirect to="/login" />;
            } else {
                return <Component {...props} />;
            }
        }}
    />
);

const mapStateToProps = (state) => ({
    auth: state.auth,
    isAuth: state.auth.token !== null
});

export default connect(mapStateToProps)(PrivateRoute);
