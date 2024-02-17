/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react'
import { 
    Flex,  
    Avatar,
    Stack,
    Text,
    Box,
    WrapItem,
    Image } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import {IThreadCard} from '../interface/Threads'
import { useNavigate } from "react-router-dom";

export default function ListThread (props: IThreadCard) {
    const navigate: any = useNavigate()
    console.log(typeof navigate)

    const [likes, setLikes] = useState(props.likes);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
    }
    return (
    <>
        <Box borderTop="#313131 1px solid" borderBottom="#313131 1px solid" mt="30px">
        <Stack direction="row" spacing={4} mt="60px" marginTop="2px" padding="10px">
            <WrapItem>
                <Avatar name='Kola Tioluwani' src={props.profil_picture} />
            </WrapItem>
            <Flex gap="10px" direction="column">
                <Flex gap="5px" alignItems="center">
                    <Text color="white">{props.fullName}</Text>
                    <Text color="white" fontWeight="light" fontSize="sm">{props.userName}</Text>
                    <FontAwesomeIcon icon={faCircle} color="white" width="5px"/>
                    <Text color="white" fontWeight="light" fontSize="sm">{props.created_at}</Text>
                </Flex>
                <Flex direction="column" gap="10px">
                    <Text color="white" fontSize="xs">{props.content}</Text>
                    <Image src={props.image} width="350px"/>
                </Flex>
                <Flex gap="30px">
                    <Flex alignItems="center" gap="6px">
                        <button onClick={handleLike}>
                        <FontAwesomeIcon icon={faHeart} color={liked ? "red" : "white"} />
                        </button>
                        <Text color="white" fontSize="12px" fontWeight="light">{likes}</Text>
                    </Flex>
                    <Flex alignItems="center" gap="6px">
                        <FontAwesomeIcon icon={faComment} color="white" />
                        <Text color="white" fontSize="12px" fontWeight="light">{props.replies}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Stack>
        </Box>
    </>
    )
}