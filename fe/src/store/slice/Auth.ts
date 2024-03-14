import { IUser } from "../../interface/Auth";
import { createSlice } from '@reduxjs/toolkit'
import { setAuthToken } from "../../libs/api";

const initialAuthState: IUser = {
    id: 0,
    email: "",
    fullName: "",
    userName: "",
    profil_picture: "",
    profil_description: "",
    followers_count: 0,
    following_count: 0
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        AUTH_LOGIN: (_, action) => {
            // // token save into localstorage
            console.log(action);
            setAuthToken(action.payload.token)
            localStorage.setItem("token", action.payload.token)
            
            const payload = action.payload
            console.log(action.payload);
            const user: IUser = {
                id: payload.user.id,
                email: payload.user.email,
                fullName: payload.user.fullName,
                userName: payload.user.userName,
                followers_count: payload.user.followers_count,
                following_count: payload.user.following_count
            }
            
            return user
        },
        AUTH_CHECK: (_, action) => {
            const payload = action.payload
            setAuthToken(localStorage.token)

            const user: IUser = {
                id: payload.user.id,
                email: payload.user.email,
                fullName: payload.user.fullName,
                userName: payload.user.userName,
                profil_description: payload.user.profil_description,
                profil_picture: payload.user.profil_picture,
                followers_count: payload.user.followers_count,
                following_count: payload.user.following_count
            }
            
            return user
        },
        AUTH_ERROR: () => {
            localStorage.removeItem("token");
        },
        AUTH_LOGOUT: () => {
            localStorage.removeItem("token");
            return initialAuthState;
        },
    }
})