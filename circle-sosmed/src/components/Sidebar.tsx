import { List, ListItem, Text, Button} from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { faHome, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar: React.FC = () => {
    return (
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
      <Button backgroundColor="#04a51e" borderRadius="50px" width="200px" color="white" _hover={{bg:"#413543", color:"white"}}>Create Post</Button>
    </List>
    )
}

export default Sidebar