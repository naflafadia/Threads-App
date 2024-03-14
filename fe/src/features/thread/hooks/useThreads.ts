/* eslint-disable no-empty */
/* eslint-disable no-useless-catch */
import React, { FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../libs/api";
import { IThreadPost } from "../../../interface/Threads";

export function useThreads() {
    const {data: threads, isLoading, error, refetch } = useQuery({
        queryKey: ["threads"],
        queryFn: async () => API.get('/threads').then((data) => data.data)
    })

    return {
        threads,
        isLoading,
        error,
        refetch
    }
}

export function usePostThread() {
    const { refetch } = useThreads()
    const [data, setData] = React.useState<IThreadPost>({
        content: "",
        image: ""
    })

    console.log(data)

    async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, files } = event.target
        
        if(files) {
            setData({
                ...data,
                [name]: files[0]
            })
        } else {
            setData({
                ...data,
                [name]: value
            })
        }
    }

    // const postThread = useMutation({
    //     mutationFn: async () => await API.post("/thread", data),
    //     onSuccess: () => {
    //         refetch()

    //         setData({
    //             content: "",
    //             image: ""
    //         })
    //     }
    // })

    const fileInputRef = React.useRef<HTMLInputElement>(null)

    function handleButtonClick() {
        fileInputRef.current?.click()
    }

    async function postThread(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        try {
            const formData = new FormData()

            formData.append("content", data.content)
            formData.append("image", data.image as File)

            await API.post('/thread', formData)

            refetch()
        } catch (error) {
            throw error
        }
    }

    return {
        data,
        handleChange,
        postThread,
        handleButtonClick,
        fileInputRef
    }
}