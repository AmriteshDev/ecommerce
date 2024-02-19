import { unstable_createMuiStrictModeTheme } from "@material-ui/core";
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS
} from "../constants/userConstant";

import axios from "axios";


// Login

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`/api/v1/login`, { email, password }, config);

        dispatch({ type: LOGIN_SUCCESS, payload: data.user })



    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.error,
        })
    }
};

// Register

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(`/api/v1/register`, userData, config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })


    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.error,
        })
    }
}


// Load User

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST });

        const { data } = await axios.get(`/api/v1/me`);

        dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user })



    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.error,
        })
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};

