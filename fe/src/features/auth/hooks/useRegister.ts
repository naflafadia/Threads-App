/* eslint-disable no-useless-catch */
import { IUserRegister } from "../../../interface/Auth";
import { API } from "../../../libs/api";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export function useRegister() {
    const navigate = useNavigate()
    const toast = useToast();
    const [register, setRegister] = React.useState<IUserRegister>({
        userName: "",
        fullName: "",
        email: "",
        password: ""
    })

    function handleChanges(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setRegister({
            ...register,
            [name] : value
        })
    }

    async function handleRegister() {
        try {
            const response = await API.post("/auth/register", register)
            console.log(response, "ini responsss");

            toast({
                title: "Registration Success",
                description: "You have successfully registered.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            navigate("/auth/login")
        } catch(error) {
            toast({
                title: "Registration Failed",
                description: "Failed to register. Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            throw error
        }
    }

    return {
        register,
        handleChanges,
        handleRegister
    }
}
