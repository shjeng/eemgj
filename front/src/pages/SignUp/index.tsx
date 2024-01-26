import React, { ChangeEvent, KeyboardEvent, forwardRef, useRef, useState } from 'react';
import AuthInputBox from '../../components/AuthInputBox';


const SignUp =() => {
  //    state     //
  const emailRef = useRef<HTMLInputElement | null>(null);
  const emailAuthValueRef = useRef<HTMLInputElement | null>(null);
  const pwdRef = useRef<HTMLInputElement | null>(null);
  const pwdChkRef = useRef<HTMLInputElement | null>(null);

  const [page, setPage] = useState<number>(1);
  // page 1 state
  const [email, setEmail] = useState<string>(''); // 이메일 
  const [emailAuthValue, setEmailAuthValue] = useState<string>(''); // 이메일 인증
  const [pwd, setPwd] = useState<string>(''); // 비밀번호
  const [pwdChk, setPwdChk] = useState<string>(''); // 비밀번호 확인

  // page 2 state
  const [phone, setPhone] = useState<string>(''); // 핸드폰 번호
  const [phoneAuthValue, setPhoneAuthValue] = useState<string>(''); // 핸드폰 번호 인증
  const [nickname, setNickname] = useState<string>(''); // 닉네임
  const [address, setAaddress] = useState<string>(''); // 주소
  const [detailAddress, setDetailAddress] = useState<string>(''); // 상세주소

  const [emailAuthChk, setEmailAuthChk] = useState<boolean>(false); // 이메일 인증 됐는지 
  const [phoneAuthChk, setPhoneAuthChk] = useState<boolean>(false); // 핸드폰 인증이 됐는지 
  const [nicknameAuthChk, setNicknameAuthChk] = useState<boolean>(false); // 닉네임 중복 확인 

  const [emailError, setEmailError] = useState<boolean>(false); // 이메일 에러 
  const [emailAuthValueError, setEmailAuthValueError] = useState<boolean>(false); // 이메일 인증 에러 
  const [pwdError, setPwdError] = useState<boolean>(false); // 비밀번호 에러 
  const [pwdChkError, setPwdChkError] = useState<boolean>(false); // 비밀번호 확인 에러 

  const [phoneError, setPhoneError] = useState<boolean>(false); // 핸드폰 번호 에러 
  const [phoneAuthValueError, setPhoneAuthValueError] = useState<boolean>(false); // 핸드폰 인증 에러 
  const [nicknameError, setNicknameError] = useState<boolean>(false); // 닉네임 중복 에러 
  const [addressError, setAddressError] = useState<boolean>(false); // 주소 미기입 에러 


  // function:  email 함수     // 
  const onEmailChangeHander = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmailError(false);
    setEmail(value);
  }
  const onEmailKeyDownHander = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const emailCheck = emailRegEx.test(email);
    if(!emailCheck){
      setEmailError(true); // 이메일 형식이 아니면 
      return;
    }
    onEmailAuthButtonClickHandler();
  }

  // function: email Auth Button 
const onEmailAuthButtonClickHandler = () => {

}

  return (
    <>
    <div id="auth">

      <div className='auth-left-box'>
        <div className='auth-left-top-text'>
        <div className='auth-left-bottom-img'></div>
      </div>
      </div>

      <div className='auth-right-box'>
        {page === 1 &&
        <div>
          <AuthInputBox label={'이메일'} ref={emailRef} placeholder={'이메일 주소를 입력해주세요.'} button_text={'인증'} value={email} icon={false} error={emailError} onChangeHandler={onEmailChangeHander} onKeyDownHandler={onEmailKeyDownHander}/>
          <AuthInputBox label={'인증 번호'} ref={emailAuthValueRef} placeholder='인증 번호를 입력해주세요.' button_text='인증' value={email} icon={true} error={false} onChangeHandler={onEmailChangeHander} onKeyDownHandler={onEmailKeyDownHander}/>
          <AuthInputBox label={'비밀번호'} ref={pwdRef} placeholder='이메일 주소를 입력해주세요' button_text='인증' value={email} icon={false} error={false} onChangeHandler={onEmailChangeHander} onKeyDownHandler={onEmailKeyDownHander}/>
          <AuthInputBox label={'비밀번호 확인'} ref={pwdChkRef} placeholder='이메일 주소를 입력해주세요' button_text='인증' value={email} icon={false} error={false} onChangeHandler={onEmailChangeHander} onKeyDownHandler={onEmailKeyDownHander}/>
        </div>
        }
        {page === 2 &&
        <div>
          <AuthInputBox label='휴대폰 번호' ref={emailRef} placeholder='이메일 주소를 입력해주세요' button_text='인증' value={email} icon={true} error={false} onChangeHandler={onEmailChangeHander} onKeyDownHandler={onEmailKeyDownHander}/>
          <AuthInputBox label='인증 번호' ref={emailRef} placeholder='이메일 주소를 입력해주세요' button_text='인증' value={email} icon={true} error={false} onChangeHandler={onEmailChangeHander} onKeyDownHandler={onEmailKeyDownHander}/>
          <AuthInputBox label='닉네임' ref={emailRef} placeholder='이메일 주소를 입력해주세요' button_text='인증' value={email} icon={true} error={false} onChangeHandler={onEmailChangeHander} onKeyDownHandler={onEmailKeyDownHander}/>
          <AuthInputBox label='주소' ref={emailRef} placeholder='이메일 주소를 입력해주세요' button_text='인증' value={email} icon={true} error={false} onChangeHandler={onEmailChangeHander} onKeyDownHandler={onEmailKeyDownHander}/>
          <AuthInputBox label='상세주소' ref={emailRef} placeholder='이메일 주소를 입력해주세요' button_text='인증' value={email} icon={true} error={false} onChangeHandler={onEmailChangeHander} onKeyDownHandler={onEmailKeyDownHander}/>
        </div>
        }
      </div>
    </div>
    </>
  );
};

export default SignUp;