import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
    return (
    <ChakraProvider>
      <CSSReset />
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App