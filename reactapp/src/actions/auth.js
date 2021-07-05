import axios from "axios";

axios.defaults.baseURL = "https://e-shopp-django.herokuapp.com";


export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: "UserLoading" });

    axios.get('/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: "UserLoaded",
                payload: res.data
            })
        }).catch(err => {
            console.log(err);
            dispatch({ type: "AuthError" })
        });
}

export const login = (username, password) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username: username, password: password })

    axios.post('/auth/login', body, config)
        .then(res => {
            dispatch({
                type: "LoginSuccess",
                payload: res.data
            })
        }).catch(err => {
            console.log(err);
            dispatch({ type: "LoginFail" })
        });
}


export const logout = () => (dispatch, getState) => {

    axios.post('/auth/logout/', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: "LogoutSuccess",
            });
        }).catch(err => {
            console.log(err);
        });
}

export const register = ({ username, name, email, password }) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({ username, name, email, password });

    axios
        .post('/auth/register', body, config)
        .then((res) => {
            dispatch({
                type: "RegisterSuccess",
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: "RegisterFail",
            });
        });
};



export const tokenConfig = (getState) => {
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};
