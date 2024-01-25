import './style.css';

import React, { ChangeEvent, KeyboardEvent, forwardRef, useState } from 'react';

interface Props{
  label: string;
  placeholder: string;
  button_text: string;
  value: string;
  icon: boolean;
  error: boolean;
  authChk?: boolean;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDownHandler: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const AuthInputBox = forwardRef<HTMLInputElement, Props>((props:Props, ref) => {
  //    state     //
  // const []
  const {label, value, placeholder,button_text} = props;
  const {icon, error, authChk} = props;

  //    function    //
  const {onChangeHandler, onKeyDownHandler} = props;
  
  // input 박스에 필요한 것 
  // 공통 : placeholer, label, value, error, onKeyDownHandler
  // 일부 : icon(ok표시), 
  // 버튼 : onClickHandler 필요 => 인증, 닉네임 중복 확인 / 
  

  // 회원가입 인풋 박스 8개 
  // 1 이메일 2 인증 3 비밀번호 4 비밀번호 확인 
  // 5 휴대폰 6 인증 7 닉네임 8 주소 9 상세주소 
  return (
    <>
    <div>
      <div>{label}</div>
      {icon &&
      <div className='icon-box18'>
        {!authChk ? <div className='icon auth-ok-icon'></div> : <div className='icon auth-no-icon'></div>}
      </div>}
    </div>
    <div>
      <input placeholder={placeholder} ref={ref} value={value} onChange={onChangeHandler}/>
      <div onKeyDown={onKeyDownHandler}>{button_text}</div>
    </div>
    </>
  );
});

export default AuthInputBox;