const initialState = {
    orders: [],
    currentOrder: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "GetOrders":
            return {
                ...state,
                orders: action.payload
            };
        case "Checkout":
            return {
                ...state,
                currentOrder: action.payload
            }
        case "OrderFailed":
        case "OrderSuccess":
            return {
                ...state,
                orders: [...state.orders, action.payload],
                currentOrder: []
            }
        case "DeleteOrder":
        case "ClearCart":
            return {
                ...state,
                currentOrder: []
            }
        case "LogoutSuccess":
            return {
                ...state,
                orders: [],
                currentOrder: []
            }
        default:
            return state;
    }
}