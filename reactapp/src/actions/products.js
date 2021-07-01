import axios from "axios";

export const getProducts = () => (dispatch) => {
    axios.get('/products/')
        .then(res => {
            dispatch({
                type: "GetProducts",
                payload: res.data
            });
        }
        ).catch(err => console.log(err));
}
