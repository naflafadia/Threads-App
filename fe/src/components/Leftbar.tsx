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
         Box,
         Heading} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AiFillHome,
         AiOutlineHome,
         AiOutlineSearch,
         AiFillHeart,
         AiOutlineHeart } from "react-icons/ai";
import { BiSolidUser, BiUser, BiSolidSearchAlt2 } from "react-icons/bi";
import { RootState } from '../store/type/RootState';
import { useSelector } from 'react-redux';
import { AUTH_LOGOUT } from '../store/RootReducer';
import { useDispatch } from 'react-redux';

const Sidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(AUTH_LOGOUT());
  };

    return (
    <>
    <List color="white" fontSize="1.2em" spacing={4} justifyContent="start" position="sticky" top="0">
      <Flex direction="column" gap="20px">
        <Text fontSize='5xl' color="#04a51e" as='b'>circle</Text>
      <Link to="/">
      <ListItem display="flex" gap="7px" alignItems="center">
          {location.pathname === "/" ? <AiFillHome/> : <AiOutlineHome/>}
        <Text fontSize="lg" fontWeight={location.pathname === "/" ? "bold" : "medium"}>Home</Text>
      </ListItem>
      </Link>
      <Link to="/search">
      <ListItem display="flex" gap="7px" alignItems="center">
          {location.pathname === "/search" ? <BiSolidSearchAlt2/> : <AiOutlineSearch/>}
        <Text fontSize="lg" fontWeight={location.pathname === "/search" ? "bold" : "medium"}>Search</Text>
      </ListItem>
      </Link>
      <Link to="/follows">
      <ListItem display="flex" gap="7px" alignItems="center">
      {location.pathname === "/follows" ? <AiFillHeart/> : <AiOutlineHeart/>}
        <Text fontSize="lg" fontWeight={location.pathname === "/follows" ? "bold" : "medium"}>Follows</Text>
      </ListItem>
      </Link>
      <Link to="/profile">
      <ListItem display="flex" gap="7px" alignItems="center">
      {location.pathname === "/profile" ? <BiSolidUser/> : <BiUser/>}
        <Text fontSize="lg" fontWeight={location.pathname === "/profile" ? "bold" : "medium"}>Profile</Text>
      </ListItem>
      </Link>
      <Button backgroundColor="#04a51e" borderRadius="50px" width="170px" color="white" _hover={{bg:"#413543", color:"white"}} onClick={onOpen}>Create Post</Button>
      <Link to={'/auth/login'} onClick={handleLogout}>
      <Flex gap="10px" position="fixed" bottom="55">
      <BiLogOut color="white" fontSize="30px"/>
      <Heading as="h1" fontSize="1em" color="white" mb="20px">Logout</Heading>
      </Flex>
      </Link>
      </Flex>
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
            {/* <Avatar>
                <AvatarBadge boxSize='1.15em' bg='green.500' />
            </Avatar> */}
            <Avatar name={auth.fullName} src={auth.profil_picture}/>
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