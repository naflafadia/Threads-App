import React from 'react';
import { Grid, GridItem } from "@chakra-ui/react"
import Sidebar from '../components/Leftbar';
import Home from '../pages/Home';
import Profile from '../pages/Rightbar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/type/RootState';

const RootLayout: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth)
  console.log(auth);
  

  return (
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
    {/* home */}
    <GridItem
      as="main"
      colSpan={{ base: 6, lg: 4, xl: 3 }} 
      p="40px"
      bg="#1d1d1d"
      border="#313131 1px solid"
    >
        <Home />
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
  );
};

export default RootLayout;
