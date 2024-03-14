import { IThreadCard } from "../../interface/Threads";
import { createSlice } from "@reduxjs/toolkit";

const initialThreadState: { threads: IThreadCard[] } = { threads: []}

export const threadSlice = createSlice({
    name: "thread",
    initialState: initialThreadState,
    reducers: {
        GET_THREADS: (state, action) => {
            state.threads = action.payload
        },
        SET_THREAD_LIKE: (
            state,
            action: { payload: {id: number; isLiked: boolean}}
        ) => {
            const {id, isLiked} = action.payload

            state.threads = state.threads.map((thread) => {
                if (thread.id === id) {
                    return {
                        ...thread,
                        likesCount: isLiked
                            ? (thread.likesCount !== undefined ? thread.likesCount - 1 : 0)
                            : (thread.likesCount !== undefined ? thread.likesCount + 1 : 0),
                        is_liked: !isLiked,
                    }
                }
                return thread
            })
        }
    }
})