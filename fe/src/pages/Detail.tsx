import DetailCard from "../components/DetailCard";
import Profile from "./Profile";
import Sidebar from "../components/Sidebar";
import { Grid, GridItem } from "@chakra-ui/react"

export default function Detail () {
    return (
        <>
    <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
    {/* sidebar */}
    <GridItem
      as="aside"
      colSpan={{ base: 6, lg: 2, xl: 1 }} 
      bg="#1d1d1d"
      minHeight={{ lg: '100vh' }}
      p={{ base: '20px', lg: '30px' }}
      border="#313131 1px solid"
    >
      <Sidebar />
    </GridItem>
    {/* detail */}
    <GridItem
      as="main"
      colSpan={{ base: 6, lg: 4, xl: 3 }} 
      p="40px"
      bg="#1d1d1d"
      border="#313131 1px solid"
    >
        <DetailCard/>
    </GridItem>
    {/* Profile */}
    <GridItem
      as="main"
      colSpan={{ base: 6, lg: 4, xl: 2 }} 
      p="40px"
      bg="#1d1d1d"
      border="#313131 1px solid"
    >
        <Profile />
    </GridItem>
  </Grid>
        </>
    )
}