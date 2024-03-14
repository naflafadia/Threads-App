/* eslint-disable @typescript-eslint/no-explicit-any */
// import {useState} from 'react'
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
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ListThread (props: IThreadCard) {
    const [isLiked, setIsLiked] = useState<boolean>(props?.is_liked || false);
    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    return (
    <>
    <Link to={`/thread/${props.id}`}>
        <Box borderTop="#313131 1px solid" borderBottom="#313131 1px solid" mt="8px">
        <Stack direction="row" spacing={4} mt="60px" marginTop="2px" padding="10px">
            <WrapItem>
                <Avatar name={props.fullName} src={props.profil_picture} />
            </WrapItem>
            <Flex gap="10px" direction="column">
                <Flex gap="5px" alignItems="center">
                    <Text color="white">{props.fullName}</Text>
                    <Text color="white" fontWeight="light" fontSize="sm">@{props.userName}</Text>
                    <FontAwesomeIcon icon={faCircle} color="white" width="5px"/>
                    <Text color="white" fontWeight="light" fontSize="sm">{props.postedAt}</Text>
                </Flex>
                <Flex direction="column" gap="10px">
                    <Text color="white" fontSize="xs">{props.content}</Text>
                    <Image src={props.image} width="350px"/>
                </Flex>
                <Flex gap="30px">
                    <Flex alignItems="center" gap="6px">
                        <button onClick={handleLike}>
                        <FontAwesomeIcon icon={faHeart} color={isLiked ? "red" : "white"}  />
                        </button>
                        <Text color="white" fontSize="12px" fontWeight="light">{props.likesCount}</Text>
                    </Flex>
                    <Flex alignItems="center" gap="6px">
                        <button>
                        <FontAwesomeIcon icon={faComment} color="white" />
                        </button>
                        <Text color="white" fontSize="12px" fontWeight="light">{props.replyCount}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Stack>
        </Box>
    </Link>
    </>
    )
}