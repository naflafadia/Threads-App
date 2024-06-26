import { Box,
    Text,
    Container,
    FormControl,
    Input,
    Flex,
    Button,
    Link} from '@chakra-ui/react'

export default function Register () {
    return (
        <>
        <Box w='100%' h='100vh' backgroundColor="#1d1d1d">
        <Container>
        <Flex direction="column" justifyContent="center" gap="3px">
            <Flex direction="column" mt="120px">
            <Text fontSize='5xl' color="#04a51e" as='b'>circle</Text>
            <Text color="white" fontSize="xl" fontWeight="bold">Create account Circle</Text>
            <FormControl isRequired mt="10px">
                <Input placeholder='Fullname*' color="white" mb="15px"/>
                <Input placeholder='Email*' color="white" mb="15px"/>
                <Input placeholder='Password*' color="white"/>
            </FormControl>
            <Flex justifyContent="flex-end" mt="20px">
            </Flex>
            <Button backgroundColor="#04a51e" borderRadius="50px" width="100%" color="white" _hover={{bg:"#413543", color:"white"}}>Create</Button>
            <Flex gap="5px" mt="5px">
            <Text color="white">Already have account?</Text>
            <Link href='/login' color="#04a51e">Login</Link>
            </Flex>
            </Flex>
        </Flex>
        </Container>
        </Box>
        </>
    )
}