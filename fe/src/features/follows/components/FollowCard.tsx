import { Avatar,
         Button, 
         Flex, 
         WrapItem,
         Text } from "@chakra-ui/react";
import { IFollow } from "../../../interface/Follow";
// import useFollow from "../hooks/useFollow";

export function FollowCard(props: IFollow) {
    // const { handleFollow } = useFollow()

    return (
        <>
        <Flex direction="column" alignItems="flex-start">
            <Flex gap="10px" mt="20px">
                <WrapItem>
                    <Avatar name={props.fullName} src={props?.profil_picture ?? ""}/>
                </WrapItem>
                <Flex direction="column">
                    <Text color="white" fontWeight="bold" fontSize="md">{props?.fullName}</Text>
                    <Text color="white" fontSize="xs" fontWeight="thin">@{props?.userName}</Text>
                </Flex>
                <Flex justifyContent="flex-end" alignItems="center">
                    <Button backgroundColor="#262626" borderRadius="50px" width="85px" color="white" _hover={{bg:"#413543", color:"white"}} border="white 1px solid" fontSize="xs" height="20px" padding="10px" marginLeft="150px">{props?.is_followed ? "Unfollow" : "Follow"}
                    </Button>
                </Flex>
            </Flex>
        </Flex>
        </>
    )
}