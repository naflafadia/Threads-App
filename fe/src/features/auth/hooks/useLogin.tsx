/* eslint-disable no-useless-catch */
import React, { ChangeEvent } from "react";
import { IUserLogin } from "../../../interface/Auth";
import { API } from "../../../libs/api";
import { AUTH_LOGIN } from "../../../store/RootReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function useLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useToast();
    const [form, setForm] = React.useState<IUserLogin>({
        email: "",
        password: ""
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target

        setForm({
            ...form,
            [name]: value 
        })
    }

    async function handleSubmit() {
        try {
            const response = await API.post('/auth/login', form)
            dispatch(AUTH_LOGIN(response.data))
            console.log(response);

            toast({
                title: "Login Success",
                description: "You have successfully logged in.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            
            navigate("/")
        } catch (error) {
            toast({
                title: "Login Failed",
                description: "Failed to login. Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            throw error
        }
    }

    return {
        handleChange,
        handleSubmit
    }
}