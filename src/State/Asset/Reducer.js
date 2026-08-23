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

const initialState = {
    asset: null,
    assets: [],
    loading: false,
    error: null,
};

const assetReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ASSET_REQUEST:
        case GET_USER_ASSETS_REQUEST:
        case GET_ALL_ASSETS_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_ASSET_SUCCESS:
            return { ...state, asset: action.payload, loading: false, error: null };

        case GET_USER_ASSETS_SUCCESS:
            return { ...state, asset: action.payload, loading: false, error: null };

        case GET_ALL_ASSETS_SUCCESS:
            return { ...state, assets: action.payload, loading: false, error: null };

        case GET_ASSET_FAILURE:
        case GET_USER_ASSETS_FAILURE:
        case GET_ALL_ASSETS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}

export default assetReducer;