
const initialState = {
    items: [],
    cartItems: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "LoadItems":
            return {
                ...state,
                items: action.payload
            };
        case "AddItem":
            return {
                ...state,
                items: [...state.items, action.payload],
            }
        case "LoadCartItems":
            return {
                ...state,
                cartItems: action.payload
            };
        case "AddCartItem":
            return {
                ...state,
                // cartItems: [...state.cartItems, action.payload],
                cartItems: {
                    ...state.cartItems,
                    [action.pid]: action.pinfo
                },
            }
        case "ClearCart":
        case "LogoutSuccess":
            return {
                ...state,
                items: [],
                cartItems: []
            }
        default:
            return state;
    }
}