import { Container,
         Box, 
         Flex,
         Text,
         Image,
         Button,
         WrapItem,
         Avatar} from "@chakra-ui/react"
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin, FaFacebookSquare, FaInstagram } from "react-icons/fa";

const Profile: React.FC = () => {
    return (
        <Container display="flex" flexDirection="column" alignItems="center" gap="20px" backgroundColor="#1d1d1d" border="#313131 1px solid">
            <Box backgroundColor="#262626" width="200px" borderRadius="5px" minWidth="350px" border="#313131 1px solid">
                <Flex direction="column" padding="15px">
                    <Text color="white" fontWeight="bold">My Profile</Text>
                </Flex>
                <Container>
                <Flex direction="column" gap="10px" mb="10px">
                    <Box>
                        <Image src="https://wallpaper.dog/large/20511389.jpg" padding="10px" borderRadius="30px" height="150px" width="500px" />
                        <Image src="https://static.vecteezy.com/system/resources/thumbnails/002/204/755/small_2x/profile-placeholder-female-avatar-in-blue-tones-vector.jpg" width="60px" borderRadius="50px" marginTop="-55px" marginLeft="50px"/>
                        <Flex justifyContent="flex-end">
                        <Button backgroundColor="#262626" borderRadius="50px" width="85px" color="white" _hover={{bg:"#413543", color:"white"}} border="white 1px solid" fontSize="xs" height="20px" padding="10px" marginRight="17px">Edit Profile</Button>
                        </Flex>
                    </Box>
                    <Text color="white" fontWeight="bold" fontSize="lg" mb="-5px">✨ Renatta Deborah ✨</Text>
                    <Text color="white" fontSize="11px" fontWeight="light">@renattadeborah</Text>
                    <Text color="white" fontSize="13px">Lorem ipsum dolor sit, amet consectetur adipisicing.</Text>
                    <Flex gap="20px">
                        <Flex gap="3px">
                            <Text color="white" fontWeight="bold" fontSize="xs">350</Text>
                            <Text color="white" fontSize="xs" fontWeight="thin">Following</Text>
                        </Flex>
                        <Flex gap="3px">
                            <Text color="white" fontWeight="bold" fontSize="xs">350</Text>
                            <Text color="white" fontSize="xs" fontWeight="thin">Followers</Text>
                        </Flex>
                    </Flex>
                </Flex>
                </Container>
            </Box>
            <Box backgroundColor="#262626" width="200px" borderRadius="5px" minWidth="350px" border="#313131 1px solid">
                <Flex direction="column" padding="15px">
                    <Text color="white" fontWeight="bold">Suggested for you</Text>
                <Flex mt="20px" gap="20px">
                    <WrapItem>
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    </WrapItem>
                    <Flex direction="column">
                        <Text color="white" fontWeight="bold" fontSize="md">Ariana Grande</Text>
                        <Text color="white" fontSize="xs" fontWeight="thin">@arianagrande</Text>
                    </Flex>
                    <Flex justifyContent="flex-end" alignItems="center">
                        <Button backgroundColor="#262626" borderRadius="50px" width="85px" color="white" _hover={{bg:"#413543", color:"white"}} border="white 1px solid" fontSize="xs" height="20px" padding="10px" marginLeft="30px">Follow</Button>
                    </Flex>
                </Flex>
                <Flex mt="20px" gap="20px">
                    <WrapItem>
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    </WrapItem>
                    <Flex direction="column">
                        <Text color="white" fontWeight="bold" fontSize="md">Ariana Grande</Text>
                        <Text color="white" fontSize="xs" fontWeight="thin">@arianagrande</Text>
                    </Flex>
                    <Flex justifyContent="flex-end" alignItems="center">
                        <Button backgroundColor="#262626" borderRadius="50px" width="85px" color="white" _hover={{bg:"#413543", color:"white"}} border="white 1px solid" fontSize="xs" height="20px" padding="10px" marginLeft="30px">Follow</Button>
                    </Flex>
                </Flex>
                <Flex mt="20px" gap="20px">
                    <WrapItem>
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    </WrapItem>
                    <Flex direction="column">
                        <Text color="white" fontWeight="bold" fontSize="md">Ariana Grande</Text>
                        <Text color="white" fontSize="xs" fontWeight="thin">@arianagrande</Text>
                    </Flex>
                    <Flex justifyContent="flex-end" alignItems="center">
                        <Button backgroundColor="#262626" borderRadius="50px" width="85px" color="white" _hover={{bg:"#413543", color:"white"}} border="white 1px solid" fontSize="xs" height="20px" padding="10px" marginLeft="30px">Follow</Button>
                    </Flex>
                </Flex>
                </Flex>
            </Box>
            <Box backgroundColor="#262626" width="200px" borderRadius="5px" minWidth="350px" border="#313131 1px solid">
                <Flex direction="column" padding="12px" gap="8px">
                <Flex alignItems="center" gap="5px">
                    <Text color="white" fontSize="sm">Developed by</Text>
                    <Text color="white" fontSize="xs" marginRight="5px">@naflafadia</Text>
                    <FontAwesomeIcon icon={faCircle} color="white" width="5px"/>
                    <FaGithub color="white"/>
                    <FaLinkedin color="white"/>
                    <FaFacebookSquare color="white"/>
                    <FaInstagram color="white"/>
                </Flex>
                <Flex gap="5px" alignItems="center">
                    <Text color="white" fontSize="xs" fontWeight="thin">Powered by</Text>
                    <Image src="https://dumbways.id/assets/images/brandred.png" width="10px" height="10px"/>
                    <Text color="white" fontSize="xs" fontWeight="thin">DumbWays Indonesia</Text>
                    <FontAwesomeIcon icon={faCircle} color="white" width="5px"/>
                    <Text color="white" fontSize="xs" fontWeight="thin">#1 Coding Bootcamp</Text>
                </Flex>
                </Flex>
            </Box>
        </Container>
    )
}

export default Profile