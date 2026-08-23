import api from "@/config/api";
import {
    GET_ASSET_REQUEST,
    GET_ASSET_SUCCESS,
    GET_ASSET_FAILURE,
    GET_USER_ASSETS_REQUEST,
    GET_USER_ASSETS_SUCCESS,
    GET_USER_ASSETS_FAILURE,
    GET_ALL_ASSETS_REQUEST,
    GET_ALL_ASSETS_SUCCESS,
    GET_ALL_ASSETS_FAILURE
} from "./ActionType";

export const getAssetById = (assetId) => async (dispatch) => {
    dispatch({ type: GET_ASSET_REQUEST });
    try {
        const { data } = await api.get(`/api/asset/${assetId}`);
        console.log("get asset by id - ", data);
        dispatch({ type: GET_ASSET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ASSET_FAILURE, payload: error.message });
        console.log(error);
    }
}

export const getAssetByUserIdAndCoinId = (jwt, coinId) => async (dispatch) => {
    dispatch({ type: GET_USER_ASSETS_REQUEST });
    try {
        const { data } = await api.get(`/api/asset/coin/${coinId}/user`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("get asset by coin id - ", data);
        dispatch({ type: GET_USER_ASSETS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_USER_ASSETS_FAILURE, payload: error.message });
        console.log(error);
    }
}

export const getAssetsForUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_ALL_ASSETS_REQUEST });
    try {
        const { data } = await api.get(`/api/asset`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("get all assets - ", data);
        dispatch({ type: GET_ALL_ASSETS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_ASSETS_FAILURE, payload: error.message });
        console.log(error);
    }
}
