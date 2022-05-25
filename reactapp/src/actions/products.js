import axios from "axios";
// axios.defaults.baseURL = "https://e-shopp-django.herokuapp.com";
axios.defaults.baseURL = "http://localhost:8000";

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
