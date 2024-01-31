package com.eemgu.usedproducts.web.controller;

import com.eemgu.usedproducts.domain.dto.request.auth.EmailAuthChkRequestDto;
import com.eemgu.usedproducts.domain.dto.request.auth.EmailAuthRequestDto;
import com.eemgu.usedproducts.domain.dto.request.auth.SignInRequestDto;
import com.eemgu.usedproducts.domain.dto.request.auth.SignUpRequestDto;
import com.eemgu.usedproducts.domain.dto.response.auth.*;
import com.eemgu.usedproducts.domain.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    private final AuthService authService;
    @GetMapping("/nickname-check") // 닉네임 중복 확인
    public ResponseEntity<? super NicknameDuplChkResponseDto> nicknameDuplChk(@RequestParam("nickname") String nickname){
        ResponseEntity<? super NicknameDuplChkResponseDto> response = authService.nicknameDuplChk(nickname);
        return response;
    }
    @PostMapping("/sign-up/email-auth") // 이메일 인증 요청
    public ResponseEntity<? super EmailAuthResponseDto> signUpEmailAuth(
            @RequestBody EmailAuthRequestDto dto){
        ResponseEntity<? super EmailAuthResponseDto> response = authService.emailAuth(dto);
        return response;
    }
    @PostMapping("/sign-up/email-auth-chk") // 이메일 인증 확인
    public ResponseEntity<? super EmailAuthChkResponseDto> signUpEmailAuthChk(
            @RequestBody EmailAuthChkRequestDto dto){
        ResponseEntity<? super EmailAuthChkResponseDto> response = authService.emailAuthChk(dto);
        return response;
    }
    @PostMapping("/sign-in") // 로그인
    public ResponseEntity<? super SignInResponseDto> signIn(@RequestBody SignInRequestDto dto){
        return authService.signIn(dto);
    }
    @PostMapping("/sign-up") // 회원가입
    public ResponseEntity<? super SignUpResponseDto> signUp(
            @RequestBody SignUpRequestDto dto){
        return authService.signUp(dto);
    }
}
