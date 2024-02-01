import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import './style.css';
import AuthInputBox from '../../components/AuthInputBox';
import { signInRequest } from '../../apis';
import { SignInRequestDto } from '../../apis/request/auth';
import { PostSignInResponseDto } from '../../apis/response/auth';
import { ResponseDto } from '../../apis/response';
import { MAIN_PATH } from '../../constant';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const SignIn = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  //   state    //
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const[email, setEmail] = useState<string>('');
  const[password,setPassword] = useState<string>('');

  const [loginError, setLoginError] = useState<boolean>(false); // 이메일 에러 

  // function: email function     //
  const onEmailChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmail(value);
    setLoginError(false);
  }
  const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter' || email.length === 0) return;
    passwordRef.current?.focus();
  }

  // function: password function     //
  const onPasswordChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPassword(value);
    setLoginError(false);
  }
  const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter' || email.length === 0) return;
    onLoginButtonClick();
  }
  

  // function: login 버튼 클릭    //
  // api: login api 기능 
  const onLoginButtonClick = () => {
    if(email.length<3 || password.length < 8){
      setLoginError(true);
    }
    const requestDto: SignInRequestDto = {email,password};
    signInRequest(requestDto).then(signInResponse);
  }
  const signInResponse = (responseBody:PostSignInResponseDto | ResponseDto | null) => {
    if(!responseBody) {
      alert('네트워크 이상입니다.');
      return;
    }
    const {code} = responseBody;
    if(code === 'SF') alert('로그인 실패.');
    if(code === 'DBE') alert('데이터베이스 오류입니다.');
    if(code !== 'SU') {
      setLoginError(true); // 이메일 인증 요청했을 때 오류가 발생하면. 
      emailRef.current?.focus();
      return;
    }
    const {token, expirationTime} = responseBody as PostSignInResponseDto;
    const now = new Date().getTime();
    const expires = new Date(now + expirationTime * 1000);
    // 유효시간: 현재시간 + 백엔드에서 설정한 시간(60분) * 1000
    setCookie('accessToken', token, {expires,path:MAIN_PATH()});
    // 'accessToken' : 이름, token 설정, path : 유효경로(MAIN_PATH() 이하의 모든 경로에서 유효함)
    navigate(MAIN_PATH());

  }

  return (
    <div id='sign-in-wrap'>

      <div className='left-box'>
        <div className='left-box-img'></div>
      </div>

      <div className='right-box'>

        <div className='right-box-top'>{'로그인'}</div>

        <div className='right-box-middle-top'>
          <AuthInputBox label={'이메일'} placeholder={'이메일은 입력해주세요.'} value={email} icon={false}  type={'text'} onChangeHandler={onEmailChangeHandler} onKeyDownHandler={onEmailKeyDownHandler} ref={emailRef}/>
          <AuthInputBox label={'비밀번호'} placeholder={'비밀번호를 입력해주세요.'} value={password} icon={false}  type={'password'} onChangeHandler={onPasswordChangeHandler} onKeyDownHandler={onPasswordKeyDownHandler} ref={passwordRef}/>
          {loginError &&
          <div className='error-message'>{'이메일 또는 비밀번호가 틀렸습니다.'}</div>
          }
        </div>

        <div className='right-box-middle-bottom'>
          <div className='login-button' onClick={onLoginButtonClick}>{'로그인'}</div>
          <div className='line-100'></div>
          <div className='find-block'>
            <div className='find-block-text'>{'이메일 찾기'}</div>
            <div className='length-line'></div>
            <div className='find-block-text'>{'비밀번호 찾기'}</div>
            <div className='length-line'></div>
            <div className='find-block-text'>{'회원가입'}</div>
          </div>
        </div>

        <div className='right-box-bottom'>
            <div className='right-box-bottom-kakao'>
              <div className='kakao-button'>
                <div>
                  {'카카오 로그인'}
                </div>
              </div>
            </div>
            <div className='right-box-bottom-naver'>
              <div className='naver-button'>
                <div>
                  {'네이버 로그인'}
                </div>
              </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default SignIn;