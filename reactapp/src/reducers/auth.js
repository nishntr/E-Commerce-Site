
const initialState = {
    token: localStorage.getItem('token'),
    // isAuthenticated: null,
    isLoading: false,
    errMsg: null,
    user: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "UserLoading":
            return {
                ...state,
                isLoading: true,
                errMsg: null,
            }
        case "UserLoaded":
            return {
                ...state,
                isLoading: false,
                // isAuthenticated: true,
                user: action.payload,
                errMsg: null,
            }
        case "refresh":
            return {
                ...state,
                isLoading: false,
                errMsg: null,

            }
        case "LoginSuccess":
        case "RegisterSuccess":
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                // isAuthenticated: true,
                isLoading: false,
                errMsg: null
            }

        case "LoginFail":
        case "AuthError":
        case "LogoutSuccess":
        case "RegisterFail":
            localStorage.removeItem('token');
            return {
                ...state,
                isLoading: false,
                token: null,
                // isAuthenticated: false,
                user: null,
                errMsg: action.msg
            }

        default:
            return state;
    }
}