import axios from "axios";
import { tokenConfig } from "./auth";
// axios.defaults.baseURL = "https://e-shopp-django.herokuapp.com";
axios.defaults.baseURL = "http://localhost:8000";


export const getOrders = () => (dispatch, getState) => {
    axios.get('/orders', tokenConfig(getState))
        .then(res => {
            console.log("getorders")
            dispatch({
                type: "GetOrders",
                payload: res.data
            });
        }
        ).catch(err => console.log(err));
}
export const deleteOrder = (id) => (dispatch, getState) => {
    axios.delete(`/orders/${id}/delete`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: "DeleteOrder",
            });
        }
        ).catch(err => console.log(err));
}

export const checkStock = (ids) => (dispatch, getState) => {
    const token = getState().auth.token;
    console.log('ids-', ids)
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            'ids': ids
        }
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    axios.post('/stock', { 'ids': ids }, tokenConfig)
        .then(res => {
            console.log("checkStock")
            console.log(res.data)
            return res.data
        }
        ).catch(err => console.log(err));
}

export const checkout = (product_ids, amount, names) => (dispatch, getState) => {
    axios.post('/checkout', { "product_ids": product_ids, "amount": amount, "names": names }, tokenConfig(getState))
        .then(res => {
            console.log(res.data);
            dispatch({
                type: "Checkout",
                payload: res.data
            });

        }
        ).catch(err => {
            console.log(err);
        });
    return true

}


// export const deleteTask = (id) => (dispatch, getState) => {
//     axios.delete(`/api/${id}`, tokenConfig(getState))
//         .then(res => {
//             console.log(res.data);
//             dispatch({
//                 type: DeleteTask,
//                 payload: id
//             });
//         }
//         ).catch(err => console.log(err));
// }


// export const updateTask = (task) => (dispatch, getState) => {
//     axios.put(`/api/${task.id}/`, task, tokenConfig(getState))
//         .then(res => {
//             console.log(res.data);
//             dispatch({
//                 type: UpdateTask,
//                 payload: res.data
//             });
//         }
//         ).catch(err => console.log(err));
// }
