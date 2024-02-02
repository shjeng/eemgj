import React, { ChangeEvent, KeyboardEvent, forwardRef, useEffect, useRef, useState } from 'react';
import AuthInputBox from '../../components/AuthInputBox';
import { nicknameDupleChk, signUpEmailAuthChkRequest, signUpEmailAuthRequest, signUpRequest } from '../../apis';
import { EmailAuthChkRequestDto, EmailAuthRequestDto, SignUpRequestDto } from '../../apis/request/auth';
import { GetNicknameDuplChk, PostEmailAuthChkDto, PostEmailAuthDto, PostSignUpResponseDto } from '../../apis/response/auth';
import { ResponseDto } from '../../apis/response';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../constant';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const SignUp =() => {
  //    state     //
  const navigate = useNavigate();

  // page1 ref
  const emailRef = useRef<HTMLInputElement | null>(null);
  const emailAuthValueRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordChkRef = useRef<HTMLInputElement | null>(null);

  // page2 ref
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const detailAddressRef = useRef<HTMLInputElement | null>(null);

  const [page, setPage] = useState<number>(1);
  // page 1 state
  const [email, setEmail] = useState<string>(''); // 이메일 
  const [emailAuthValue, setEmailAuthValue] = useState<string>(''); // 이메일 인증
  const [password, setpassword] = useState<string>(''); // 비밀번호
  const [passwordChk, setpasswordChk] = useState<string>(''); // 비밀번호 확인

  // page 2 state
  const [phone, setPhone] = useState<string>(''); // 핸드폰 번호
  const [nickname, setNickname] = useState<string>(''); // 닉네임
  const [address, setAaddress] = useState<string>(''); // 주소
  const [detailAddress, setDetailAddress] = useState<string>(''); // 상세주소

  const [emailAuthChk, setEmailAuthChk] = useState<boolean>(false); // 이메일 인증 됐는지 
  const [nicknameDuplChk, setNicknameDuplChk] = useState<boolean>(false); // 닉네임 중복 확인 

  const [emailError, setEmailError] = useState<boolean>(false); // 이메일 에러 
  const [emailAuthValueError, setEmailAuthValueError] = useState<boolean>(false); // 이메일 인증 에러 
  const [passwordError, setPasswordError] = useState<boolean>(false); // 비밀번호 에러 
  const [passwordChkError, setpasswordChkError] = useState<boolean>(false); // 비밀번호 확인 에러 

  const [phoneError, setPhoneError] = useState<boolean>(false); // 핸드폰 번호 에러 
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
    onEmailAuthButtonClickHandler(); // 이메일 인증 번호 요청 
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
    setEmailAuthDisplay(false); // 인증 번호 칸 사라짐.
  }

  // function: password 
  const onpasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setpassword(value);
    setPasswordError(false);
  }
  const onpasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(password.length > 7 && password.length < 21){
      setPasswordError(true);
      alert('암호는 8~20자 사이로 입력해주세요.')
      return;
    }
    passwordChkRef.current?.focus();
  }
  // function: password Check 
  const onpasswordChkChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setpasswordChk(value);
    setpasswordChkError(false);
  }
  const onpasswordChkKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(password !== passwordChk){
      alert('비밀번호가 일치하지 않습니다.');
      setpasswordChkError(true);
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
    if(password.length<8){
      setPasswordError(true);
      passwordRef.current?.focus();
    }
    if(password !== passwordChk){
      setpasswordChkError(true);
      passwordChkRef.current?.focus();
      return;
    }
    setPage(2);
  }
  // function: Page1의 로그인 버튼 클릭
  const loginPage = () => {
    navigate(LOGIN_PATH())
  }

  // function: 핸드폰 번호 함수     //
  const onPhoneChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPhone(value);
    setPhoneError(false);
  }
  const onPhoneKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    const regex = /^[0-9\b -]{0,13}$/;
    if (!regex.test(phone)) {
      setPhoneError(true);
      phoneRef.current?.focus();
      return;
    }
    nicknameRef.current?.focus();
  }
  useEffect(() => {
    if (phone.length === 10) {
      setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phone.length === 13) {
      setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [phone]);
  // function: 닉네임 함수    //
  const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
    if(value.length > 8){
      alert('닉네임의 최대 길이는 8자 입니다.');
      return;
    }
    if(reg.test(value)){
      alert('특수문자는 사용할 수 없습니다.');
      return;
    }
    setNicknameDuplChk(false);
    setNickname(value);
    setNicknameError(false);
  }
  const onNicknameKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
    if(event.key !== 'Enter') return;
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
    if(nickname.length < 2){
      alert('닉네임을 입력해주세요.');
      setNicknameError(true);
      return;
    }
    if(reg.test(nickname)){
      alert('특수문자는 사용할 수 없습니다.');
      return;
    }
    onNicknameDuplChkButtonClickHandler();

  }
  // api: 닉네임 중복 확인 api //
  const onNicknameDuplChkButtonClickHandler = () => {
    nicknameDupleChk(nickname).then(nicknameDuplChkResponse);
  }
  const nicknameDuplChkResponse = (responseBody: GetNicknameDuplChk | ResponseDto | null) => {
    if(!responseBody) {
      alert('네트워크 이상입니다.');
      return;
    }
    const {code} = responseBody;
    if(code === 'DN') alert('중복 이메일입니다.');
    if(code === 'DBE') alert('데이터베이스 오류입니다.');
    if(code !== 'SU') {
      setNicknameError(true); // 닉네임 오류 
      nicknameRef.current?.focus(); // 닉네임 포커스 
      return;
    }
    alert('닉네임 중복 확인이 완료됐습니다.');
    setNicknameDuplChk(true);
    addressRef.current?.focus();
  }
  // function: 주소 관련 함수     // 
  const open = useDaumPostcodePopup();
  const onAddressKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
    if(event.key !== 'Enter') return;
    onAddressButtonClickHandler();
  }
  const onAddressButtonClickHandler = () => {
    open({onComplete});
  }
  const onComplete = (data:any) => {
    const{address} = data;
    setAaddress(address);
    setAddressError(false); 
    detailAddressRef.current?.focus();
  }
  // function: 디테일 주소 관련 함수 
  const onDetailAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    if(value.length>20){
      alert('최대 20글자까지 입력이 가능합니다.');
      detailAddressRef.current?.focus();
      return;
    }
    setDetailAddress(value);
  }
  const onDetailAddressKeyDowmHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    signUpButton();
  }

  // function: 회원가입 버튼 클릭   //
  const signUpButton = () => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (!regex.test(phone)) {
      setPhoneError(true);
      phoneRef.current?.focus();
      return;
    }
    if(phoneError){
      phoneRef.current?.focus();
      return;
    }
    if(!nicknameDuplChk){
      alert('닉네임 중복 확인을 해주세요.');
      nicknameRef.current?.focus();
      return;
    }
    if(addressError || address.length === 0){
      alert('주소를 입력해주세요.');
      addressRef.current?.focus();
      return
    }
    const requestBody: SignUpRequestDto = {
      email, password , phone, nickname, address, detailAddress
    }
    signUpRequest(requestBody).then(signUpResponse);
  }
  // api: 회원가입 버튼 api   // 
  const signUpResponse = (responseBody: PostSignUpResponseDto | null) => {
    if(!responseBody) {
      alert('네트워크 오류');
      return;
    }
    const {code} = responseBody;
    if(code === 'DE') {
      alert('중복 이메일입니다.');
      setPage(1);
      emailRef.current?.focus();
      setEmailError(true);
      return;
    }
    if(code === 'DT') {
      alert('이미 가입된 정보가 있는 번호입니다.');
      phoneRef.current?.focus();
      setPhoneError(true);
    }
    if(code === 'DN') {
      alert('이미 가입된 닉네임입니다.');
      setNicknameError(true);
      nicknameRef.current?.focus();
    }
    if(code === 'DBE') alert('네트워크 오류');
    if(code !== 'SU') return;

    alert('회원 가입이 성공적으로 완료했습니다!\n로그인 페이지로 이동합니다.');
    navigate(LOGIN_PATH());
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
          <AuthInputBox label={'비밀번호'}  type={'password'} ref={passwordRef} placeholder={'8글자 이상 입력해주세요'}  value={password} icon={false} error={passwordError} 
          onChangeHandler={onpasswordChangeHandler} onKeyDownHandler={onpasswordKeyDownHandler}/>
          <AuthInputBox label={'비밀번호 확인'} type={'password'} ref={passwordChkRef} placeholder={'비밀번호를 한번 더 입력해주세요.'} value={passwordChk} icon={false} error={passwordChkError} 
          onChangeHandler={onpasswordChkChangeHandler} onKeyDownHandler={onpasswordChkKeyDownHandler}/>
          
        </div>

        </>
        }
        {page === 2 &&
        <div className='auth-input-boxs'>
          <AuthInputBox label={'휴대폰 번호'} type={'text'} ref={phoneRef} placeholder={'휴대폰 번호를 입력해주세요.'}  value={phone} icon={false} error={phoneError} 
          onChangeHandler={onPhoneChangeHandler} onKeyDownHandler={onPhoneKeyDownHandler} />
          <AuthInputBox label={'닉네임'} type={'text'} ref={nicknameRef} placeholder={'닉네임을 입력해주세요. (2~8자)'} button_text={'확인'} value={nickname} icon={true} error={nicknameError} 
          onChangeHandler={onNicknameChangeHandler} onKeyDownHandler={onNicknameKeyDownHandler} textGray={nicknameDuplChk} onButtonClickHandler={onNicknameDuplChkButtonClickHandler} isButton={true} authChk={nicknameDuplChk}/>
          <AuthInputBox label={'주소'} ref={addressRef} placeholder={'주소를 입력해주세요'} value={address} button_text={'찾기'}  icon={false} error={addressError} type={'text'} isReadonly={true}
          onKeyDownHandler={onAddressKeyDownHandler} isButton={true} onButtonClickHandler={onAddressButtonClickHandler}/> 
          <AuthInputBox label={'상세주소'} ref={detailAddressRef} placeholder={'상세 주소를 입력해주세요.'} type={'text'} value={detailAddress}  error={false}  icon={false}
          onChangeHandler={onDetailAddressChangeHandler} onKeyDownHandler={onDetailAddressKeyDowmHandler}/>
        </div>
        }
        <div className='auth-right-bottom-box'>
          {page === 1 && <div className='auth-right-bottom-next-btn' onClick={nextStageButton}>{'다음단계'}</div>}
          {page === 2 && <div className='auth-right-bottom-next-btn' onClick={signUpButton}>{'회원가입'}</div>}
          
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