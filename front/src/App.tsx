import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Container from './layouts/Container';
import Main from './pages/Main';
import { LOGIN_PATH, MAIN_PATH, SIGNUP_PATH } from './constant';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { useCookies } from 'react-cookie';
import useLoginUserStore from './stores/login-user-store';
import OurNegighborhoodProducts from './pages/OurNeighborhoodProducts';

function App() {
  const [cookies, setCookie] = useCookies();
  const{loginUser,setLoginUser, resetLoginUser} = useLoginUserStore();

  useEffect(()=>{
    const expires = new Date(0  * 0);
    if(!cookies.accessToken){
      resetLoginUser();
      setCookie('accessToken','',{expires ,path: MAIN_PATH() });
      return;
    }
    // getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  },[cookies.accessToken]);
  return (
    <Routes>
      <Route element={<Container />}>
        {
        !loginUser ? // 로그인이 되어있지 않을 때 보여주는 화면 
        <Route path={MAIN_PATH()} element={<Main/>}></Route>:
        <Route path={MAIN_PATH()} element={<OurNegighborhoodProducts />} />
        }
        <Route path={SIGNUP_PATH()} element={<SignUp/>}></Route>
        <Route path={LOGIN_PATH()} element={<SignIn />}></Route>
      </Route>
    </Routes>

  );
}

export default App;
