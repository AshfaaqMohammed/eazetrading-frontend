import {
    GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS,
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
    LOGIN_TWO_STEP_FAILURE, LOGIN_TWO_STEP_REQUEST, LOGIN_TWO_STEP_SUCCESS,
    LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS,
    SEND_VERIFICATION_OTP_FAILURE, SEND_VERIFICATION_OTP_REQUEST, SEND_VERIFICATION_OTP_SUCCESS,
    ENABLE_TWO_STEP_AUTHENTICATION_FAILURE, ENABLE_TWO_STEP_AUTHENTICATION_REQUEST, ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS
} from "./ActionType"

const initialState = {
    user: null,
    loading: false,
    error: null,
    jwt: null,
    twoStepSessionId: null,
    twoFactorAuthEnabled: false,
    otpSent: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case LOGIN_TWO_STEP_REQUEST:
        case SEND_VERIFICATION_OTP_REQUEST:
        case ENABLE_TWO_STEP_AUTHENTICATION_REQUEST:
            return { ...state, loading: true, error: null }

        case REGISTER_SUCCESS:
            return { ...state, loading: false, error: null, jwt: action.payload }

        case LOGIN_SUCCESS:
            if (action.payload.twoFactorAuthEnabled) {
                return {
                    ...state,
                    loading: false,
                    error: null,
                    twoStepSessionId: action.payload.session,
                    twoFactorAuthEnabled: true
                }
            }
            return { ...state, loading: false, error: null, jwt: action.payload.jwt }

        case LOGIN_TWO_STEP_SUCCESS:
            return { ...state, loading: false, error: null, jwt: action.payload, twoStepSessionId: null, twoFactorAuthEnabled: false }

        case GET_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null }

        case SEND_VERIFICATION_OTP_SUCCESS:
            return { ...state, loading: false, error: null, otpSent: true }

        case ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null }

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case LOGIN_TWO_STEP_FAILURE:
        case SEND_VERIFICATION_OTP_FAILURE:
        case ENABLE_TWO_STEP_AUTHENTICATION_FAILURE:
            return { ...state, loading: false, error: action.payload }

        case LOGOUT:
            return initialState

        default:
            return state;
    }
}

export default authReducer;
