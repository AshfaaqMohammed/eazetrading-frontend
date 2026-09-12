import api from "@/config/api";
import {
    PAY_ORDER_REQUEST,
    PAY_ORDER_SUCCESS,
    PAY_ORDER_FAILURE,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILURE,
    GET_ALL_ORDER_REQUEST,
    GET_ALL_ORDER_SUCCESS,
    GET_ALL_ORDER_FAILURE
} from "./ActionType";

export const payOrder = (jwt, orderData) => async (dispatch) => {
    dispatch({ type: PAY_ORDER_REQUEST });
    try {
        const { data } = await api.post(`/api/orders/pay`, orderData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("pay order - ", data);
        dispatch({ type: PAY_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PAY_ORDER_FAILURE, payload: error.message });
        console.log(error);
    }
}

export const getOrderById = (jwt, orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_REQUEST });
    try {
        const { data } = await api.get(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("get order by id - ", data);
        dispatch({ type: GET_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ORDER_FAILURE, payload: error.message });
        console.log(error);
    }
}

export const getAllOrdersForUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_ALL_ORDER_REQUEST });
    try {
        const { data } = await api.get(`/api/orders`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("get all orders - ", data);
        dispatch({ type: GET_ALL_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_ORDER_FAILURE, payload: error.message });
        console.log(error);
    }
}
