/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Input,
         Flex, 
         Heading, 
         Spacer, 
         Avatar, 
         AvatarBadge, 
         Stack,
         Button,
         Container } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import data from '../data.json'
import ListThread from "../components/ListThread";
import {IThreadCard} from '../interface/Threads'

const Home: React.FC = () => {
    const [threads, setThreads] = React.useState<IThreadCard[]>([]);
    useEffect(() => {
        setThreads(data)
    })
    console.log(threads)
    return (
     <Container backgroundColor="#1d1d1d">
        <Flex direction="column" gap="5px">
            <Heading as="h1" fontSize="1.5em" color="white" mb="20px">Home</Heading>
            <Spacer />
        <Stack direction='row' spacing={4}>
            <Avatar>
                <AvatarBadge boxSize='1.15em' bg='green.500' />
            </Avatar>
            <Input variant='unstyled' placeholder='What is happening?!' />
            <Flex gap="10px" alignItems="center">
                <FontAwesomeIcon icon={faImage} color="#04a51e" />
                <Button backgroundColor="#04a51e" borderRadius="50px" width="70px" color="white" _hover={{bg:"#413543", color:"white"}} fontSize="sm" height="30px">Post</Button>
            </Flex>
        </Stack>
        {threads.map((data:IThreadCard, index:number) => (
            <ListThread
            id={data.id}
            avatar={data.avatar}
            name={data.name}
            username={data.username}
            timeUpload={data.timeUpload}
            content={data.content}
            uploadImage={data.uploadImage}
            likes={data.likes}
            comment={data.comment}
            key={index}
            />
        ))}
        </Flex>
     </Container>
    )
}

export default Home