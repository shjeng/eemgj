import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Container from './layouts/Container';
import Main from './pages/Main';
import { LOGIN_PATH, MAIN_PATH, SIGNUP_PATH } from './constant';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Routes>
      <Route element={<Container />}>

        <Route path={MAIN_PATH()} element={<Main/>}></Route>
        <Route path={SIGNUP_PATH()} element={<SignUp/>}></Route>

      </Route>
    </Routes>

  );
}

export default App;
