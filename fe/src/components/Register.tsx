import { Box,
    Text,
    Container,
    FormControl,
    Input,
    Flex,
    Button,
    Link} from '@chakra-ui/react'
import { useRegister } from '../features/auth/hooks/useRegister'

export default function Register () {
    const { register, handleChanges, handleRegister } = useRegister()
    console.log(register, "registerrrrr");
    

    return (
        <>
        <Box w='100%' h='100vh' backgroundColor="#1d1d1d">
        <Container>
        <Flex direction="column" justifyContent="center" gap="3px">
            <Flex direction="column" mt="120px">
            <Text fontSize='5xl' color="#04a51e" as='b'>circle</Text>
            <Text color="white" fontSize="xl" fontWeight="bold">Create account Circle</Text>
            <FormControl isRequired mt="10px">
                <Input placeholder='Fullname*' color="white" mb="15px" name='fullName' onChange={handleChanges}/>
                <Input placeholder='Username*' color="white" mb="15px" name='userName' onChange={handleChanges}/>
                <Input placeholder='Email*' color="white" mb="15px" name='email' onChange={handleChanges}/>
                <Input placeholder='Password*' color="white" type='password' name='password' onChange={handleChanges}/>
            </FormControl>
            <Flex justifyContent="flex-end" mt="20px">
            </Flex>
            <Button backgroundColor="#04a51e" borderRadius="50px" width="100%" color="white" _hover={{bg:"#413543", color:"white"}} onClick={handleRegister}>Create</Button>
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