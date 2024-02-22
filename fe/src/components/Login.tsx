import { Box,
         Text,
         Container,
         FormControl,
         Input,
         Flex,
         Button,
         Link} from '@chakra-ui/react'
import { useState } from 'react'
import { API } from '../libs/api'
import { useNavigate } from 'react-router-dom'

export default function Login () {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate()

    const data = {
        email: email,
        password: password
    }

    const handleLogin = async () => {
        const response = await API.post('/auth/login', data)
        console.log(response);
        navigate('/')
    }

    console.log("email", email);
    

    return (
        <>
        <Box w='100%' h='100vh' backgroundColor="#1d1d1d">
        <Container>
        <Flex direction="column" justifyContent="center" gap="3px">
            <Flex direction="column" mt="120px">
            <Text fontSize='5xl' color="#04a51e" as='b'>circle</Text>
            <Text color="white" fontSize="xl" fontWeight="bold">Login to Circle</Text>
            <FormControl isRequired mt="10px">
                <Input placeholder='Email/Username*' color="white" mb="15px" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <Input placeholder='Password*' color="white" type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </FormControl>
            <Flex justifyContent="flex-end">
            <Text fontSize="small" fontWeight="thin" color="white" mt="3px" mb="4px">Forgot Password?</Text>
            </Flex>
            <Button backgroundColor="#04a51e" borderRadius="50px" width="100%" color="white" _hover={{bg:"#413543", color:"white"}} onClick={handleLogin}>Login</Button>
            <Flex gap="5px" mt="5px">
            <Text color="white">Don't have an account yet?</Text>
            <Link href='/register' color="#04a51e">Create account</Link>
            </Flex>
            </Flex>
        </Flex>
        </Container>
        </Box>
        </>
    )
}