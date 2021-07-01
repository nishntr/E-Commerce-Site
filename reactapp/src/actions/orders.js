import axios from "axios";
import { tokenConfig } from "./auth";

export const getOrders = () => (dispatch, getState) => {
    axios.get('/api/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: "GetOrders",
                payload: res.data
            });
        }
        ).catch(err => console.log(err));
}

export const checkout = (task) => (dispatch, getState) => {
    axios.post('/api/', task, tokenConfig(getState))
        .then(res => {
            console.log(res.data);
            dispatch({
                type: "Checkout",
                payload: res.data
            });
        }
        ).catch(err => console.log(err));
}


export const deleteTask = (id) => (dispatch, getState) => {
    axios.delete(`/api/${id}`, tokenConfig(getState))
        .then(res => {
            console.log(res.data);
            dispatch({
                type: DeleteTask,
                payload: id
            });
        }
        ).catch(err => console.log(err));
}


export const updateTask = (task) => (dispatch, getState) => {
    axios.put(`/api/${task.id}/`, task, tokenConfig(getState))
        .then(res => {
            console.log(res.data);
            dispatch({
                type: UpdateTask,
                payload: res.data
            });
        }
        ).catch(err => console.log(err));
}
