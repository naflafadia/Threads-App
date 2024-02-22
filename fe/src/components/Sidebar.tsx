import React from 'react'
import { List, 
         ListItem,
         Text, 
         Button,
         Input, 
         Modal, 
         ModalCloseButton, 
         ModalContent,
         ModalOverlay,
         useDisclosure,
         Container,
         Flex,
         Spacer,
         Stack,
         Avatar,
         AvatarBadge,
         Box,
         Heading} from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { faHome, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

    return (
    <>
    <List color="white" fontSize="1.2em" spacing={4} justifyContent="start" position="fixed">
        <Text fontSize='5xl' color="#04a51e" as='b'>circle</Text>
      <ListItem display="flex" gap="7px">
        <NavLink to="/">
          <FontAwesomeIcon icon={faHome}/>
        </NavLink>
        <Text fontSize="lg">Home</Text>
      </ListItem>
      <ListItem display="flex" gap="7px">
        <NavLink to="create">
          <FontAwesomeIcon icon={faMagnifyingGlass}/>
        </NavLink>
        <Text fontSize="lg">Search</Text>
      </ListItem>
      <ListItem display="flex" gap="7px">
        <NavLink to="profile">
          <FontAwesomeIcon icon={faHeart}/>
        </NavLink>
        <Text fontSize="lg">Follows</Text>
      </ListItem>
      <ListItem display="flex" gap="7px">
        <NavLink to="profile">
          <FontAwesomeIcon icon={faUser}/>
        </NavLink>
        <Text fontSize="lg">Profile</Text>
      </ListItem>
      <Button backgroundColor="#04a51e" borderRadius="50px" width="170px" color="white" _hover={{bg:"#413543", color:"white"}} onClick={onOpen}>Create Post</Button>
      <Link to={'/login'}>
      <Flex gap="10px" position="fixed" bottom="55">
      <BiLogOut color="white" fontSize="30px"/>
      <Heading as="h1" fontSize="1em" color="white" mb="20px">Logout</Heading>
      </Flex>
      </Link>
    </List>
    <Container>
    <Modal
    isOpen={isOpen}
    onClose={onClose}
  >
    <ModalOverlay />
    <ModalContent backgroundColor="#1d1d1d">
      <ModalCloseButton backgroundColor="#FFF7F1"/>
      <Box borderBottom="#313131 1px solid">
        <Flex direction="column" gap="5px" mt="20px" padding="20px">
            <Spacer />
        <Stack direction='row' spacing={4}>
            <Avatar>
                <AvatarBadge boxSize='1.15em' bg='green.500' />
            </Avatar>
            <Input variant='unstyled' placeholder='What is happening?!' color="white" />
        </Stack>
        </Flex>
        </Box>
        <Flex gap="10px" alignItems="center" mt="20px" padding="5px">
                <FontAwesomeIcon icon={faImage} color="#04a51e" width="50px" />
                <Spacer />
                <Button backgroundColor="#04a51e" borderRadius="50px" width="70px" color="white" _hover={{bg:"#413543", color:"white"}} fontSize="sm" height="30px" mr="20px">Post</Button>
        </Flex>
    </ModalContent>
  </Modal>
  </Container>
  </>
  )
}

export default Sidebar