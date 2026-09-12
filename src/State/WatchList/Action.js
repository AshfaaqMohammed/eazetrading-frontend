import api from "@/config/api";
import {
    GET_USER_WATCHLIST_REQUEST,
    GET_USER_WATCHLIST_SUCCESS,
    GET_USER_WATCHLIST_FAILURE,
    ADD_COIN_TO_WATCHLIST_REQUEST,
    ADD_COIN_TO_WATCHLIST_SUCCESS,
    ADD_COIN_TO_WATCHLIST_FAILURE
} from "./ActionType";

export const getUserWatchlist = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_WATCHLIST_REQUEST });
    try {
        const { data } = await api.get(`/api/watchlist/user`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("user watchlist - ", data);
        dispatch({ type: GET_USER_WATCHLIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_USER_WATCHLIST_FAILURE, payload: error.message });
        console.log(error);
    }
}

export const addCoinToWatchlist = (jwt, coinId) => async (dispatch) => {
    dispatch({ type: ADD_COIN_TO_WATCHLIST_REQUEST });
    try {
        const { data } = await api.patch(`/api/watchlist/add/coin/${coinId}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("add coin to watchlist - ", data);
        dispatch({ type: ADD_COIN_TO_WATCHLIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_COIN_TO_WATCHLIST_FAILURE, payload: error.message });
        console.log(error);
    }
}
