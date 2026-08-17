import api from "@/config/api";
import { DEPOSITE_MONEY_FAILURE, DEPOSITE_MONEY_REQUEST, DEPOSITE_MONEY_SUCCESS, GET_USER_WALLET_FAILURE, GET_USER_WALLET_REQUEST, GET_USER_WALLET_SUCCESS, GET_WALLET_TRANSACTION_FAILURE, GET_WALLET_TRANSACTION_REQUEST, GET_WALLET_TRANSACTION_SUCCESS, TRANSFER_MONEY_FAILURE, TRANSFER_MONEY_REQUEST, TRANSFER_MONEY_SUCCESS } from "./ActionType";

export const getUserWallet = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_WALLET_REQUEST });
    try {
        const { data } = await api.get(`/api/wallet`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("user wallet - ", data);
        dispatch({ type: GET_USER_WALLET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_USER_WALLET_FAILURE, payload: error.message });
        console.log(error);
    }
}

export const getWalletTransactions = (jwt) => async (dispatch) => {
    dispatch({ type: GET_WALLET_TRANSACTION_REQUEST });
    try {
        const { data } = await api.get(`/api/transactions`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("wallet transactions - ", data);
        dispatch({ type: GET_WALLET_TRANSACTION_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_WALLET_TRANSACTION_FAILURE, payload: error.message });
        console.log(error);
    }
}

export const paymentHandler = (jwt, paymentMethod, amount) => async (dispatch) => {
    dispatch({ type: DEPOSITE_MONEY_REQUEST });
    try {
        const { data } = await api.post(`/api/payment/${paymentMethod}/amount/${amount}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("payment handler - ", data);
        window.location.href = data.paymentUrl
        
        dispatch({ type: DEPOSITE_MONEY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DEPOSITE_MONEY_FAILURE, payload: error.message });
        console.log(error);
    }
}

export const depositeMoney = (jwt, orderId, paymentId,navigate) => async (dispatch) => {
    dispatch({ type: DEPOSITE_MONEY_REQUEST });
    try {
        const { data } = await api.put(`/api/wallet/deposit?order_id=${orderId}&payment_id=${paymentId}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("deposit money - ", data);
        dispatch({ type: DEPOSITE_MONEY_SUCCESS, payload: data });
        navigate("/wallet")
    } catch (error) {
        dispatch({ type: DEPOSITE_MONEY_FAILURE, payload: error.message });
        console.log(error);
    }
}

export const transferMoney = (jwt, walletId, reqData) => async (dispatch) => {
    dispatch({ type: TRANSFER_MONEY_REQUEST });
    try {
        const { data } = await api.put(`/api/wallet/${walletId}/transfer`, reqData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("transfer money - ", data);
        dispatch({ type: TRANSFER_MONEY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: TRANSFER_MONEY_FAILURE, payload: error.message });
        console.log(error);
    }
}
