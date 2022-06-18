export const addItem = (item) => (dispatch) => {
    console.log(item)
    dispatch({
        type: "AddItem",
        payload: item
    });
}
export const addCartItem = (id, info) => (dispatch) => {
    // console.log(item)
    dispatch({
        type: "AddCartItem",
        pid: id,
        pinfo: info
    });
}

export const clearCart = () => dispatch => {
    dispatch({
        type: "ClearCart"
    })
}
