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
         AvatarBadge} from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { faHome, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

const Sidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

    return (
    <>
    <List color="white" fontSize="1.2em" spacing={4}>
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
      <Button backgroundColor="#04a51e" borderRadius="50px" width="200px" color="white" _hover={{bg:"#413543", color:"white"}} onClick={onOpen}>Create Post</Button>
    </List>
    <Container backgroundColor="#1d1d1d">
    <Modal
    isOpen={isOpen}
    onClose={onClose}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
        <Flex direction="column" gap="5px">
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
        </Flex>
    </ModalContent>
  </Modal>
  </Container>
  </>
  )
}

export default Sidebar