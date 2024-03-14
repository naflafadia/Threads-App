/* eslint-disable no-useless-catch */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Detail from './pages/Detail';
import FollowsPage from './pages/FollowsPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import { API, setAuthToken } from './libs/api';
import { useDispatch } from 'react-redux';
import { AUTH_CHECK } from './store/RootReducer';
import { Navigate, Outlet } from 'react-router-dom';

const App: React.FC = () => {
  const dispatch = useDispatch()

  async function checkAuth() {
    try {
      setAuthToken(localStorage.token)

      const response = await API.get("/auth/check")
      dispatch(AUTH_CHECK(response.data))
      console.log(response);
      
    } catch (error) {
      throw error
    }
  }
  React.useEffect(() => {
    checkAuth()
  }, [])

  function IsLogin() {
    if(!localStorage.token) {
      return <Navigate to={"/auth/login"} />
    } else {
      return <Outlet />
    }
  }

  function IsNotLogin() {
    if(localStorage.token) {
      localStorage.removeItem("token");
      return <Navigate to={"/"} />
    } else {
      return <Outlet />
    }
  }

    return (
    <ChakraProvider>
      <CSSReset />
      <Router>
        <Routes>
          <Route path="/" element={<IsLogin />} >
            <Route path="/" element={<RootLayout />}/>
            <Route path="/thread/:id" element={<Detail/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/follows" element={<FollowsPage/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
          </Route>
          <Route path="/" element={<IsNotLogin/>}>
          <Route path="/auth/login" element={<LoginPage/>}/>
          <Route path="/auth/register" element={<RegisterPage/>}/>
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App