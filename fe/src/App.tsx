import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';

const App: React.FC = () => {
    return (
    <ChakraProvider>
      <CSSReset />
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App