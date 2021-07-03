
const initialState = {
    items: [],
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
        case "ClearCart":
        case "LogoutSuccess":
            return {
                ...state,
                items: []
            }
        default:
            return state;
    }
}