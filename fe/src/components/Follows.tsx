/* eslint-disable @typescript-eslint/no-explicit-any */
import{ Tabs,
        TabList,
        TabPanels,
        TabPanel,
        Tab,
        Heading,
        Container, 
        Flex} from '@chakra-ui/react'
import { API } from '../libs/api'
import { GET_FOLLOWS} from '../store/RootReducer'
import { RootState } from '../store/type/RootState'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FollowCard } from '../features/follows/components/FollowCard'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

export default function Follows () {
    const dispatch = useDispatch()
    // const followState = useSelector((state: RootState) => state.follow.followState)
    const follows = useSelector((state: RootState) => state.follow.follows)

    async function getFollowData(type: string) {
        const response = await API.get(`/follows?type=${type}`)
        dispatch(GET_FOLLOWS(response.data))
        console.log(response, "ini response");
    }
    console.log(follows, "ini followsss");
    

    useEffect(() => {
        getFollowData('followers')
    }, [])
    
    return (
    <>
    <Container backgroundColor="#1d1d1d">
        <Tabs variant="line" color="white">
            <Flex gap="30px">
                <Link to={'/'}>
                <BiArrowBack color="white" fontSize="25px"/>
                </Link>
                <Heading as="h1" fontSize="1.5em" color="white" mb="20px">Follows</Heading>
            </Flex>
        <TabList mb='1em'>
            <Tab  _selected={{ borderBottomColor: "#04a51e"}} width="50%" onClick={() => getFollowData("followers")}>Followers</Tab>
            <Tab  _selected={{ borderBottomColor: "#04a51e"}} width="50%" onClick={() => getFollowData("followings")}>Following</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                {follows?.map((follow: any, index) => {
                    return (
                        <FollowCard
                            key={index}
                            id={follow?.id}
                            user_id={follow?.user_id}
                            fullName={follow?.fullName}
                            userName={follow?.userName}
                            email={follow?.email}
                            profil_picture={follow?.profil_picture}
                            profil_description={follow?.profil_description}
                            is_followed={follow?.is_followed}
                        />
                    )
                })}
            </TabPanel>
            <TabPanel>
                {follows?.map((follow, index) => (
                    <FollowCard
                    key={index}
                    id={follow?.id}
                    user_id={follow?.user_id}
                    fullName={follow?.fullName}
                    userName={follow?.userName}
                    email={follow?.email}
                    profil_picture={follow?.profil_picture}
                    profil_description={follow?.profil_description}
                    is_followed={follow?.is_followed}
                    />
                ))}
            </TabPanel>
        </TabPanels>
    </Tabs>
    </Container>
    </>
    )
}