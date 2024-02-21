import React, { useEffect } from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Container from './layouts/Container';
import Main from './pages/Main';
import { ADD_PRODUCT, LOGIN_PATH, MAIN_PATH, SALES_BOARD_DETAIL, SIGNUP_PATH } from './constant';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { useCookies } from 'react-cookie';
import useLoginUserStore from './stores/login-user-store';
import OurNegighborhoodProducts from './pages/OurNeighborhoodProducts';
import AddProduct from './pages/Addproduct';
import SalesBoardDetail from './pages/SalesBoardDetail';
import { getUser } from './apis';
import { GetUserResponseDto } from './apis/response/user';
import { ResponseDto } from './apis/response';

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
    getUser(cookies.accessToken).then(getUserResponse);
  },[cookies.accessToken]);
  const getUserResponse = (responseBody:GetUserResponseDto | ResponseDto | null) => {
    if(!responseBody) return;
    const {code}= responseBody; 
    if(code === 'VF') alert('유효성 검사 실패');
    if(code === 'NU') alert('존재하지 않는 유저');
    if(code === 'DBE') alert('데이터베이스 오류');
    if(code !== 'SU'){
      resetLoginUser();
      return;
    }
    const loginUser = {...responseBody as GetUserResponseDto};
    setLoginUser(loginUser.user);
  }
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
        <Route path={ADD_PRODUCT()} element={<AddProduct />}></Route>
        <Route path={SALES_BOARD_DETAIL()} element={<SalesBoardDetail />}></Route>
      </Route>
    </Routes>

  );
}

export default App;
