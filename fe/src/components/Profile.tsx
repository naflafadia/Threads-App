import { Box, Button, Container, Flex, Heading, Text, Image, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/type/RootState";

export default function ProfileCard () {
    const auth = useSelector((state: RootState) => state.auth)

    return (
        <>
        <Container backgroundColor="#1d1d1d">
            <Flex gap="30px">
            <Link to={'/'}>
            <BiArrowBack color="white" fontSize="25px"/>
            </Link>
            <Heading as="h1" fontSize="1.5em" color="white" mb="20px">{auth.fullName}</Heading>
            </Flex>
            <Box borderTop="#313131 1px solid" mt="8px">
                <Flex direction="column" gap="5px" mb="10px" mt="20px">
                        <Image src="https://i.pinimg.com/originals/5f/08/58/5f085809f2b711643e4eb4974cc03c0e.gif" borderRadius="10px" height="60%" width="100%" />
                        <Image src={auth.profil_picture} mt="-45px" ml="40px" borderRadius="50%" width="100px" height="100px"/>
                        <Flex justifyContent="flex-end">
                        <Button backgroundColor="#262626" borderRadius="50px" width="85px" color="white" _hover={{bg:"#413543", color:"white"}} border="white 1px solid" fontSize="xs" height="20px" padding="10px" marginRight="17px">Edit Profile</Button>
                        </Flex>
                    <Text color="white" fontWeight="bold" fontSize="lg" mb="-5px">{auth.fullName}</Text>
                    <Text color="white" fontSize="11px" fontWeight="light">@{auth.userName}</Text>
                    <Text color="white" fontSize="13px">Lorem ipsum dolor sit, amet consectetur adipisicing.</Text>
                    <Flex gap="20px">
                        <Flex gap="3px">
                            <Text color="white" fontWeight="bold" fontSize="xs">{auth.following_count}</Text>
                            <Text color="white" fontSize="xs" fontWeight="thin">Following</Text>
                        </Flex>
                        <Flex gap="3px">
                            <Text color="white" fontWeight="bold" fontSize="xs">{auth.followers_count}</Text>
                            <Text color="white" fontSize="xs" fontWeight="thin">Followers</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Tabs variant="line" color="white">
                    <TabList>
                        <Tab _selected={{ borderBottomColor: "#04a51e"}} width="50%">Post</Tab>
                        <Tab _selected={{ borderBottomColor: "#04a51e"}} width="50%">Likes</Tab>
                    </TabList>
                    <TabPanels>
                        {/* initially mounted */}
                        <TabPanel>
                            <p style={{ color: "white" }}>one!</p>
                        </TabPanel>
                        {/* initially not mounted */}
                        <TabPanel>
                            <p style={{ color: "white" }}>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
        </>
    )
}