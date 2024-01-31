import './style.css';

import React, { ChangeEvent, KeyboardEvent, forwardRef, useState } from 'react';

interface Props{
  label: string;
  placeholder: string;

  value: string;
  icon: boolean;
  error: boolean; // 에러가 있을 시 
  authChk?: boolean; // 인증이 완료 됐을 경우 
  type: string;
  onChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDownHandler: (event: KeyboardEvent<HTMLInputElement>) => void;

  // 인증 button 
  isButton?: boolean;
  isReadonly?: boolean; // 인증번호 요청하면 readonly로 변환 
  button_text?: string;
  textGray?: boolean; // 닉네임 중복 확인이 되면 회색 글씨로 
  onButtonClickHandler?: () => void;
}

const AuthInputBox = forwardRef<HTMLInputElement, Props>((props:Props, ref) => {
  //    state     //
  // const []
  const {label, value, placeholder,button_text, isReadonly, isButton, type} = props;
  const {icon, error, authChk, textGray} = props;
  //    function    //
  const {onChangeHandler, onKeyDownHandler} = props;
  const {onButtonClickHandler} = props;
  // input 박스에 필요한 것 
  // 공통 : placeholer, label, value, error, onKeyDownHandler
  // 일부 : icon(ok표시), 
  // 버튼 : onClickHandler 필요 => 인증, 닉네임 중복 확인 / 
  

  // 회원가입 인풋 박스 8개 
  // 1 이메일 2 인증 3 비밀번호 4 비밀번호 확인 
  // 5 휴대폰 6 인증 7 닉네임 8 주소 9 상세주소 
  return (
    <>
    <div id='input-component'>
      <div className='label-icon'>
        <div className='label'>{label}</div>
        {icon && // 아이콘이 있냐, 없냐 icon이 false면 authChk 받으면 안 됨
        <div className='icon-box18'>
          {authChk ? <div className='icon auth-ok-icon'></div> : <div className='icon auth-no-icon'></div>}
        </div>}
      </div>

      <div className='input-box'>
        {isButton ?
        <>
          {textGray ? // text 색상 회색 확인
            <input className={error ? 'error button input' : 'garytext button input'} type={type} placeholder={placeholder} ref={ref} value={value} onChange={onChangeHandler} readOnly={isReadonly} onKeyDown={onKeyDownHandler}/> :
            <input className={error ? 'error button input' : 'button input'} type={type} placeholder={placeholder} ref={ref} value={value} onChange={onChangeHandler} readOnly={isReadonly} onKeyDown={onKeyDownHandler}/> 
          } 
          </>
          
        :
        <input className={error ? 'error input' : 'input'} type={type} placeholder={placeholder} ref={ref} value={value} onChange={onChangeHandler} readOnly={isReadonly} onKeyDown={onKeyDownHandler}/>
        }
        {isButton && // 버튼이 존재하냐 안 하냐.
        <div className='auth-button' onClick={onButtonClickHandler}>{button_text}</div>
        }
      </div>
    </div>
    </>
  );
});

export default AuthInputBox;