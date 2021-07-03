export const addItem = (item) => (dispatch) => {
    console.log(item)
    dispatch({
        type: "AddItem",
        payload: item
    });
}

export const clearCart = () => dispatch => {
    dispatch({
        type: "ClearCart"
    })
}
