import api from "@/config/api";
import {
    GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS,
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
    LOGIN_TWO_STEP_FAILURE, LOGIN_TWO_STEP_REQUEST, LOGIN_TWO_STEP_SUCCESS,
    LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS,
    SEND_VERIFICATION_OTP_FAILURE, SEND_VERIFICATION_OTP_REQUEST, SEND_VERIFICATION_OTP_SUCCESS,
    ENABLE_TWO_STEP_AUTHENTICATION_FAILURE, ENABLE_TWO_STEP_AUTHENTICATION_REQUEST, ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS
} from "./ActionType";

export const register = (userData, navigate) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    try {
        const response = await api.post(`/auth/signup`, userData);
        const user = response.data;
        console.log(user);

        dispatch({ type: REGISTER_SUCCESS, payload: user.jwt })
        localStorage.setItem("jwt", user.jwt);
        navigate("/")
    } catch (error) {
        // Surface the backend's real message (e.g. "Email is already used with
        // another account.") instead of axios's generic "Request failed..." string.
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            (typeof error.response?.data === "string" ? error.response.data : null) ||
            error.message;
        dispatch({
            type: REGISTER_FAILURE,
            payload: { message, status: error.response?.status }
        })
        console.log(error);
    }
}

export const login = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const response = await api.post(`/auth/login`, userData.formData);
        const data = response.data;
        console.log(data);

        dispatch({ type: LOGIN_SUCCESS, payload: data })

        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            userData.navigate("/")
        }
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const verifyLoginOtp = (otp, id, navigate) => async (dispatch) => {
    dispatch({ type: LOGIN_TWO_STEP_REQUEST })
    try {
        const response = await api.post(`/auth/two-factor/otp/${otp}?id=${id}`);
        const data = response.data;
        console.log("verify login otp - ", data);

        dispatch({ type: LOGIN_TWO_STEP_SUCCESS, payload: data.jwt })
        localStorage.setItem("jwt", data.jwt);
        navigate("/")
    } catch (error) {
        dispatch({ type: LOGIN_TWO_STEP_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    try {
        const response = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        const user = response.data;
        console.log(user);

        dispatch({ type: GET_USER_SUCCESS, payload: user })
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const sendVerificationOtp = (jwt, verificationType) => async (dispatch) => {
    dispatch({ type: SEND_VERIFICATION_OTP_REQUEST })
    try {
        const response = await api.post(`/api/users/verification/${verificationType}/send-otp`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("send otp - ", response.data);
        dispatch({ type: SEND_VERIFICATION_OTP_SUCCESS, payload: response.data })
    } catch (error) {
        dispatch({ type: SEND_VERIFICATION_OTP_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const enableTwoFactorAuth = (jwt, otp) => async (dispatch) => {
    dispatch({ type: ENABLE_TWO_STEP_AUTHENTICATION_REQUEST })
    try {
        const response = await api.patch(`/api/users/enable-two-factor/verify-otp/${otp}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("enable 2FA - ", response.data);
        dispatch({ type: ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS, payload: response.data })
    } catch (error) {
        dispatch({ type: ENABLE_TWO_STEP_AUTHENTICATION_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const logOut = () => (dispatch) => {
    localStorage.clear();
    dispatch({ type: LOGOUT, payload: null });
}
