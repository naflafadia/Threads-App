/* eslint-disable no-useless-catch */
import { IThreadPost } from "../../../interface/Threads";
import { API } from "../../../libs/api";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function useThreadsReply() {
    const {id} = useParams()
    const [ formReply, setFormReply ] = useState<IThreadPost>({
        content: "",
        image: ""
    })
    console.log(formReply, 'haiiiii');

    const { data: getReplies, refetch } = useQuery({
        queryKey: ["replies"],
        queryFn: async () => await API.get(`/replies/${id}`)
        .then(res => res.data)
        .catch(error => error.message)
    })

    async function handlePostReply(event: FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()

            const formData = new FormData()
            formData.append("content", formReply.content)
            formData.append("image", formReply.image as File)
            // formData.append("thread_id", id as string)

            await API.post(`/reply/${id}`, formData)

            setFormReply({
                content: "",
                image: ""
            })

            refetch()
        } catch(error) {
            throw(error)
        }
    }

    function handleChangeReply(event: ChangeEvent<HTMLInputElement>) {
        const { name, value, files } = event.target

        if(files) {
            setFormReply({
                ...formReply,
                [name]: files[0],
            })
        } else {
            setFormReply({
                ...formReply,
                [name]: value,
            })
        }
    }

    const fileInputRefReply = useRef<HTMLInputElement>(null)

    function handleButtonClickReply() {
        fileInputRefReply.current?.click()
    }

    return {
        getReplies,
        handlePostReply,
        handleChangeReply,
        handleButtonClickReply,
        fileInputRefReply,
        formReply
    }
}
