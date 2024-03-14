import { Input,
         InputLeftElement,
         InputGroup,
         Flex,
         WrapItem,
         Avatar,
         Text,
         Button } from '@chakra-ui/react'
import { TbUserSearch } from "react-icons/tb";

export default function Search () {
    return (
        <>
        <InputGroup>
        <InputLeftElement children={<TbUserSearch color="white" />}/>
        <Input focusBorderColor='#04a51e' placeholder='Search' backgroundColor="#383838" color="white" borderRadius="20px"/>
        </InputGroup>
        <Flex direction="column" alignItems="flex-start" mt="20px">
                <Flex gap="10px">
                    <WrapItem>
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    </WrapItem>
                    <Flex direction="column">
                        <Text color="white" fontWeight="bold" fontSize="md">Ariana Grande</Text>
                        <Text color="white" fontSize="xs" fontWeight="light">@arianagrande</Text>
                        <Text color="white" fontSize="10px">Lorem ipsum dolor sit, amet consectetur adipisicing.</Text>
                    </Flex>
                    <Flex justifyContent="flex-end" alignItems="center">
                        <Button backgroundColor="#262626" borderRadius="50px" width="85px" color="white" _hover={{bg:"#413543", color:"white"}} border="white 1px solid" fontSize="xs" height="20px" padding="10px" marginLeft="250px">Follow</Button>
                    </Flex>
                </Flex>
                <Flex mt="20px" gap="10px">
                    <WrapItem>
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    </WrapItem>
                    <Flex direction="column">
                        <Text color="white" fontWeight="bold" fontSize="md">Ariana Grande</Text>
                        <Text color="white" fontSize="xs" fontWeight="thin">@arianagrande</Text>
                        <Text color="white" fontSize="10px">Lorem ipsum dolor sit, amet consectetur adipisicing.</Text>
                    </Flex>
                    <Flex justifyContent="flex-end" alignItems="center">
                        <Button backgroundColor="#262626" borderRadius="50px" width="85px" color="white" _hover={{bg:"#413543", color:"white"}} border="white 1px solid" fontSize="xs" height="20px" padding="10px" marginLeft="250px">Follow</Button>
                    </Flex>
                </Flex>
                <Flex mt="20px" gap="10px">
                    <WrapItem>
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    </WrapItem>
                    <Flex direction="column">
                        <Text color="white" fontWeight="bold" fontSize="md">Ariana Grande</Text>
                        <Text color="white" fontSize="xs" fontWeight="thin">@arianagrande</Text>
                        <Text color="white" fontSize="10px">Lorem ipsum dolor sit, amet consectetur adipisicing.</Text>
                    </Flex>
                    <Flex justifyContent="flex-end" alignItems="center">
                        <Button backgroundColor="#262626" borderRadius="50px" width="85px" color="white" _hover={{bg:"#413543", color:"white"}} border="white 1px solid" fontSize="xs" height="20px" padding="10px" marginLeft="250px">Follow</Button>
                    </Flex>
                </Flex>
                </Flex>
        </>
    )
}

