/* eslint-disable no-useless-catch */
import { API } from "../../../libs/api";
import { useDispatch } from "react-redux";
import { GET_FOLLOWS } from "../../../store/RootReducer";

export default function useFollow() {
    const dispatch = useDispatch()

    async function getFollowData(type: string) {
        try {
            const response = await API.get(`/follows?type=${type}&limit=10`)
            dispatch(GET_FOLLOWS(response.data))
            console.log(response, "dataaaaa");
            
        } catch(error) {
            throw error
        }
    }

    async function handleFollow(userId: number) {
        try {
            await API.post("/follow", { followedUserId: userId })
            await getFollowData("following");
        } catch(error) {
            throw error
        }
    }

    return{
        getFollowData,
        handleFollow
    }
}
