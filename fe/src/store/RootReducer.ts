import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slice/Auth";
import { followSlice } from "./slice/Follow";
import { threadSlice } from "./slice/Threads";

export const { AUTH_LOGIN, AUTH_CHECK, AUTH_LOGOUT } = authSlice.actions
export const { GET_FOLLOWS, SET_FOLLOW_STATE, SET_FOLLOW } = followSlice.actions
export const { GET_THREADS, SET_THREAD_LIKE } = threadSlice.actions

export const authReducer = authSlice.reducer
export const followsReducer = followSlice.reducer
export const threadReducer = threadSlice.reducer

export const rootReducer = combineReducers ({
    auth: authReducer,
    follow: followsReducer,
    thread: threadReducer
})