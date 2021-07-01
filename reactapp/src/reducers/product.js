
const initialState = {
    products: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "GetProducts":
            return {
                ...state,
                products: action.payload
            };


        case "LogoutSuccess":
            return {
                ...state,
                products: []
            }
        default:
            return state;
    }
}