/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-catch */
import React from "react"
import { Input,
         Flex, 
         Avatar, 
         AvatarBadge, 
         Stack,
         Button,
         Container, 
         Heading,} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import ListThread from "../components/ListThread";
import {IThreadCard} from '../interface/Threads'
import { IReply } from "../interface/Reply";
import { API } from "../libs/api";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

export default function DetailCard () {
    const [thread, setThread] = React.useState<IThreadCard>()
    console.log(thread, "ini lagi")
    const [reply, setReply] = React.useState<IReply[]>([])
    console.log(reply, "ini reply")
    const {id} = useParams()

    async function getDetail() {
        try {
            const response = await API.get(`/thread/${id}`)

            setThread(response.data.data)
        } catch (error) {
            throw error
        }
    }

    async function getReply() {
        try {
            const response = await API.get(`/replies/${id}`)

            setReply(response.data.data)
        } catch (error) {
            throw error
        }
    }

    React.useEffect(() => {
        getDetail();
    }, [id])

    React.useEffect(() => {
        getReply().then((data) => console.log(data))
    }, [])

    console.log(thread, "iniiii")

    return (
        <>
        <Container backgroundColor="#1d1d1d">
            <Flex direction="column" gap="5px">
            <Flex gap="30px">
            <Link to={'/'}>
            <BiArrowBack color="white" fontSize="25px"/>
            </Link>
            <Heading as="h1" fontSize="1.5em" color="white" mb="20px">Post</Heading>
            </Flex>
            {thread && (
            <ListThread
            id={thread.id}
            profil_picture={thread.user?.profil_picture}
            fullName={thread.user?.fullName}
            userName={thread.user?.userName}
            created_at={thread.created_at}
            content={thread.content}
            image={thread.image}
            likesCount={thread.likesCount}
            replyCount={thread.replyCount}
            />
        )}
        <Stack direction='row' spacing={4}>
            <Avatar>
                <AvatarBadge boxSize='1.15em' bg='green.500' />
            </Avatar>
            <Input variant='unstyled' placeholder='What is happening?!' color="white" />
            <Flex gap="10px" alignItems="center">
                <FontAwesomeIcon icon={faImage} color="#04a51e" />
                <Button backgroundColor="#04a51e" borderRadius="50px" width="70px" color="white" _hover={{bg:"#413543", color:"white"}} fontSize="sm" height="30px">Post</Button>
            </Flex>
        </Stack>
        {reply?.map((data:IReply, index:number) => (
            <ListThread
            id={data.id}
            profil_picture={data.user?.profil_picture}
            fullName={data.user?.fullName}
            userName={data.user?.userName}
            created_at={data.created_at}
            content={data.content}
            image={data.image}
            likesCount={data.likesCount}
            replyCount={data.replyCount}
            key={index}
            />
        ))}
            </Flex>
        </Container>
        </>
    )

}