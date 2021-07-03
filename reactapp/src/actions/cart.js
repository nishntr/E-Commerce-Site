export const addItem = (item) => (dispatch) => {
    console.log(item)
    dispatch({
        type: "AddItem",
        payload: item
    });
}
