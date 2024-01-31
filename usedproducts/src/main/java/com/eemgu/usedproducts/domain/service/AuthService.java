package com.eemgu.usedproducts.domain.service;

import com.eemgu.usedproducts.domain.dto.request.auth.EmailAuthChkRequestDto;
import com.eemgu.usedproducts.domain.dto.request.auth.EmailAuthRequestDto;
import com.eemgu.usedproducts.domain.dto.request.auth.SignInRequestDto;
import com.eemgu.usedproducts.domain.dto.request.auth.SignUpRequestDto;
import com.eemgu.usedproducts.domain.dto.response.auth.*;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    // ================== post ================ //
    // 이메일 인증 요청
    ResponseEntity<? super EmailAuthResponseDto> emailAuth(EmailAuthRequestDto dto);
    // 이메일 인증 확인
    ResponseEntity<? super EmailAuthChkResponseDto> emailAuthChk(EmailAuthChkRequestDto dto);
    // 닉네임 중복 확인
    ResponseEntity<? super NicknameDuplChkResponseDto> nicknameDuplChk(String nickname);

    // 회원가입
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
}
