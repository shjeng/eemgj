import React, { ChangeEvent, KeyboardEvent, forwardRef, useRef, useState } from 'react';
import AuthInputBox from '../../components/AuthInputBox';
import { signUpEmailAuthChkRequest, signUpEmailAuthRequest } from '../../apis';
import { EmailAuthChkRequestDto, EmailAuthRequestDto } from '../../apis/request/auth';
import { PostEmailAuthChkDto, PostEmailAuthDto } from '../../apis/response/auth';
import { ResponseDto } from '../../apis/response';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../constant';

const SignUp =() => {
  //    state     //
  const navigate = useNavigate();

  // page1 ref
  const emailRef = useRef<HTMLInputElement | null>(null);
  const emailAuthValueRef = useRef<HTMLInputElement | null>(null);
  const pwdRef = useRef<HTMLInputElement | null>(null);
  const pwdChkRef = useRef<HTMLInputElement | null>(null);

  // page2 ref
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const phoneAuthValueRef = useRef<HTMLInputElement | null>(null);
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const detailAddressRef = useRef<HTMLInputElement | null>(null);

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

  const [emailReadonly, setEmailReadonly] = useState<boolean>(false); // 이메일 인증 요청을 하면 read only로
  const [emailAuthDisplay, setEmailAuthDisplay] = useState<boolean>(false); // 이메일 인증 요청을 해야 보임
  const [emailChkReadonly, setEmailChkReadonly] = useState<boolean>(false); // 이메일 인증 요청을 하면 read only로
  // function:  email 함수     // 
  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmailError(false); // 비밀번호를 다시 입력하는 경우 인증 해제 
    setEmail(value);
  }
  const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const emailCheck = emailRegEx.test(email);
    if(!emailCheck){
      setEmailError(true); // 이메일 형식이 아니면 
      return;
    }
    onEmailAuthButtonClickHandler();
  }
  // api: 이메일 인증 요청 버튼 클릭     // 
  const onEmailAuthButtonClickHandler = () => {
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const emailCheck = emailRegEx.test(email);
    if(!emailCheck){
      setEmailError(true); // 이메일 형식이 아니면 
      return;
    }
    const requestBody: EmailAuthRequestDto = {email};
    signUpEmailAuthRequest(requestBody).then(signUpEmailAuthResponse);
  }
  // 이메일 인증 요청 버튼 클릭 후 응답 
  const signUpEmailAuthResponse = (responseBody: PostEmailAuthDto | ResponseDto | null) => {
    if(!responseBody) {
      alert('네트워크 이상입니다.');
      return;
    }
    const {code} = responseBody;
    if(code === 'DE') alert('이미 가입된 이메일입니다.');
    if(code === 'MF') alert('인증 번호 전송에 실패했습니다..');
    if(code === 'DBE') alert('데이터베이스 오류입니다.');
    if(code !== 'SU') {
      setEmailError(true); // 이메일 인증 요청했을 때 오류가 발생하면. 
      emailRef.current?.focus(); // 이메일에 포커스
      return;
    }
    alert("인증번호가 전송됐습니다.");
    setEmailAuthDisplay(true);

  }
  // function: email Auth Button, 이메일 인증 요청  // 
  const onEmailAuthChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmailAuthValueError(false);
    setEmailAuthValue(value);
  }
  const onEmailAuthKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(emailAuthValue.length < 6) { // 인증 번호 6글자 미만이면 오류 
      setEmailAuthValueError(true);
      return;
    }
    onEmailAuthChkButtonClickHandler();
  }
  // api: 이메일 인증 확인 클릭    //
  const onEmailAuthChkButtonClickHandler = () => {
    const requestBody: EmailAuthChkRequestDto = {email, emailAuthValue};
    signUpEmailAuthChkRequest(requestBody).then(signUpEmailAuthChkResponse);
  }
  // 응답 
  const signUpEmailAuthChkResponse = (responseBody: PostEmailAuthChkDto | ResponseDto | null) => {
    if(!responseBody) {
      alert('네트워크 이상입니다.');
      return;
    }
    const {code} = responseBody;
    if(code === 'VF') alert('유효하지 않는 이메일 또는 인증 번호입니다.');
    if(code === 'DE') alert('이미 가입된 이메일입니다.');
    if(code === 'DBE') alert('데이터베이스 오류입니다.');
    if(code !== 'SU') {
      setEmailAuthValueError(true); // 인증 번호 오류  
      emailAuthValueRef.current?.focus(); // 인증 번호 input칸에 focus
      return;
    }
    alert('인증됐습니다.');
    setEmailAuthChk(true);
    setEmailReadonly(true); // readOnly를 true로 
  }

  // function: password 
  const onPwdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPwd(value);
    setPwdError(false);
  }
  const onPwdKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(pwd.length < 8){
      setPwdError(true);
      return;
    }
    pwdChkRef.current?.focus();
  }
  // function: password Check 
  const onPwdChkChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPwdChk(value);
    setPwdChkError(false);
  }
  const onPwdChkKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(pwdChk.length < 8){
      setPwdChkError(true);
      return;
    }
    nextStageButton();
  }
  // function: 다음 단계 버튼   //
  const nextStageButton = () => {
    if(!emailAuthChk){
      setEmailError(true);
      emailRef.current?.focus();
      return;
    }
    if(pwd.length<8){
      setPwdError(true);
      pwdRef.current?.focus();
    }
    if(pwd !== pwdChk){
      setPwdChkError(true);
      pwdChkRef.current?.focus();
      return;
    }
    setPage(2);
  }
  // function: Page1의 로그인 버튼 클릭
  const loginPage = () => {
    navigate(LOGIN_PATH())
  }

  // function: 핸드폰 번호 함수     //
  const onPhoneChangeHander = (event: ChangeEvent<HTMLInputElement>) => {

  }
  const onPhoneKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;

  }
  // api: 핸드폰 인증 요청    // 
  const onPhoneAuthClickHandler = () => {
    
  }
  return (
    <>
    <div id="auth">

      <div className='auth-left-box'>
        <div className='auth-left-top-text'>{'안녕하세요. 반가워요!'}</div>
        <div className='auth-left-top-text'>{'뉴 멤버를 환영합니다!'}</div>
        <div className='auth-left-bottom-img'></div>
      </div>

      <div className='auth-right-box'>
        <div className='auth-right-box-top'>{`회원가입 (${page}/2)`}</div>
        {page === 1 &&
        <>
        <div className='auth-input-boxs'>
          <AuthInputBox label={'이메일'} ref={emailRef} type={'text'} placeholder={'이메일 주소를 입력해주세요.'} button_text={'인증'} value={email} icon={false} error={emailError} 
          onChangeHandler={onEmailChangeHandler} onKeyDownHandler={onEmailKeyDownHandler} isButton={true} onButtonClickHandler={onEmailAuthButtonClickHandler} isReadonly={emailReadonly}/>
          {emailAuthDisplay && // 이메일 인증번호
          <AuthInputBox label={'인증 번호'} type={'text'} ref={emailAuthValueRef} placeholder={'인증 번호를 입력해주세요.'} button_text={'확인'} value={emailAuthValue} icon={true} error={emailAuthValueError} 
          onChangeHandler={onEmailAuthChangeHandler} onKeyDownHandler={onEmailAuthKeyDownHandler} isButton={true} onButtonClickHandler={onEmailAuthChkButtonClickHandler} isReadonly={emailChkReadonly} authChk={emailAuthChk}/>
          }
          <AuthInputBox label={'비밀번호'}  type={'password'} ref={pwdRef} placeholder={'8글자 이상 입력해주세요'}  value={pwd} icon={false} error={pwdError} 
          onChangeHandler={onPwdChangeHandler} onKeyDownHandler={onPwdKeyDownHandler}/>
          <AuthInputBox label={'비밀번호 확인'} type={'password'} ref={pwdChkRef} placeholder={'비밀번호를 한번 더 입력해주세요.'} value={pwdChk} icon={false} error={pwdChkError} 
          onChangeHandler={onPwdChkChangeHandler} onKeyDownHandler={onPwdChkKeyDownHandler}/>
          
        </div>

        </>
        }
        {page === 2 &&
        <div className='auth-input-boxs'>
          <AuthInputBox label={'휴대폰 번호'} ref={phoneRef} placeholder='이메일 주소를 입력해주세요' button_text='인증' value={phone} icon={false} error={phoneError} 
          onChangeHandler={onPhoneChangeHander} onKeyDownHandler={onPhoneKeyDownHandler} onButtonClickHandler={} isReadonly={}/>
          <AuthInputBox label='인증 번호' ref={emailRef} placeholder='이메일 주소를 입력해주세요' button_text='인증' value={email} icon={true} error={false} 
          onChangeHandler={onEmailChangeHander} onKeyDownHandler={onEmailKeyDownHander}/>
          <AuthInputBox label='닉네임' ref={emailRef} placeholder='이메일 주소를 입력해주세요' button_text='인증' value={email} icon={true} error={false} 
          onChangeHandler={onEmailChangeHander} onKeyDownHandler={onEmailKeyDownHander}/>
          <AuthInputBox label='주소' ref={emailRef} placeholder='이메일 주소를 입력해주세요' button_text='인증' value={email} icon={true} error={false} 
          onChangeHandler={onEmailChangeHander} onKeyDownHandler={onEmailKeyDownHander}/>
          <AuthInputBox label='상세주소' ref={emailRef} placeholder='이메일 주소를 입력해주세요' button_text='인증' value={email} icon={true} error={false} 
          onChangeHandler={onEmailChangeHander} onKeyDownHandler={onEmailKeyDownHander}/>
        </div>
        }
        <div className='auth-right-bottom-box'>
          <div className='auth-right-bottom-next-btn' onClick={nextStageButton}>{'다음단계'}</div>
          <div className='auth-right-bottom-text'>
            <div>{'이미 가입된 이력이 있으신가요?'}</div>
            <div className='auth-right-bottom-text-link' onClick={loginPage}>{'로그인'}</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;