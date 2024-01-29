import axios from "axios";
import { ResponseDto } from "./response";
import { PostEmailAuthChkDto, PostEmailAuthDto } from "./response/auth";
import { EmailAuthChkRequestDto, EmailAuthRequestDto } from "./request/auth";

const DOMAIN = 'http://localhost:8080';
const API_DOMAIN = `${DOMAIN}/api`;


// 이메일 인증 요청 
const SIGN_UP_EMAIL_AUTH_URL = () => `${API_DOMAIN}/auth/sign-up/email-auth`;
export const signUpEmailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
  const result = await axios.post(SIGN_UP_EMAIL_AUTH_URL(),requestBody)
      .then(response => {
        const responseBody: PostEmailAuthDto = response.data ;
        return responseBody;
      })
      .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
      })
  return result;
}
// 이메일 인증 확인
const SIGN_UP_EMAIL_AUTH_CHK_URL = () => `${API_DOMAIN}/auth/sign-up/email-auth-chk`;
export const signUpEmailAuthChkRequest = async(requestBody: EmailAuthChkRequestDto) => {
  const result = await axios.post(SIGN_UP_EMAIL_AUTH_CHK_URL(),requestBody)
      .then(response => {
        const responseBody: PostEmailAuthChkDto = response.data;
        return responseBody;
      })
      .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
      })
  return result;

}