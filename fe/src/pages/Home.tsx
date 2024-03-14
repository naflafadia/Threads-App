/* eslint-disable no-empty */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input,
         Flex, 
         Heading, 
         Spacer, 
         Avatar, 
         Stack,
         Button,
         Container, 
         Box,
         Text} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import ListThread from "../components/ListThread";
import {IThreadCard} from '../interface/Threads'
import { RootState } from "../store/type/RootState";
import { useSelector } from "react-redux";
import { useThreads, usePostThread }  from "../features/thread/hooks/useThreads"

export default function Home ()  {
    const auth = useSelector((state: RootState) => state.auth)
    const { threads, isLoading, getThreads, error } = useThreads()
    const { data, handleChange, postThread, handleButtonClick, fileInputRef } = usePostThread()
    console.log(data, "dataaaa");
    
    return (
     <Container backgroundColor="#1d1d1d">
        <Flex direction="column" gap="5px">
            <Heading as="h1" fontSize="1.5em" color="white" mb="20px">Home</Heading>
            <Spacer />
        <Stack direction='row' spacing={4}>
            <Avatar name={auth.fullName} src={auth.profil_picture}/>
            <form encType="multipart/form-data" onSubmit={postThread}>
            <Flex>
            <Input variant='unstyled' placeholder='What is happening?!' color="white" name="content" onChange={handleChange}/>
            <Flex gap="10px" alignItems="center" ml="130px">
                <button onClick={handleButtonClick} type="button">
                    <FontAwesomeIcon icon={faImage} color="#04a51e"/>
                </button>
                <Input
                name="image"
                type='file'
                onChange={handleChange}
                style={{display: "none" }}
                ref={fileInputRef}
              />
                <Button backgroundColor="#04a51e" borderRadius="50px" width="70px" color="white" _hover={{bg:"#413543", color:"white"}} fontSize="sm" height="30px" type="submit">Post</Button>
            </Flex>
            </Flex>
            </form>
        </Stack>
        {error && (
            <Box>
                <Text color="white">Gagal memuat data</Text>
            </Box>
        )}
        {isLoading ? (
              <Box>
                <Text color="white">Now Loading ...</Text>
              </Box>
            ) : (
                <Box>
                {threads.data.map((data:IThreadCard, index:number) => (
                    <ListThread
                    id={data.id}
                    profil_picture={data.user?.profil_picture}
                    fullName={data.user?.fullName}
                    userName={data.user?.userName}
                    postedAt={data.postedAt}
                    content={data.content}
                    image={data.image}
                    likesCount={data.likesCount}
                    replyCount={data.replyCount}
                    is_liked={true}
                    user={data.user}
                    key={index}
                    />
                ))}
                </Box>
            )
          }
        </Flex>
     </Container>
    )
}