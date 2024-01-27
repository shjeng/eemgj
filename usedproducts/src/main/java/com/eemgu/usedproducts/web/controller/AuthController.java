package com.eemgu.usedproducts.web.controller;

import com.eemgu.usedproducts.domain.dto.request.auth.EmailAuthChkRequestDto;
import com.eemgu.usedproducts.domain.dto.request.auth.EmailAuthRequestDto;
import com.eemgu.usedproducts.domain.dto.response.auth.EmailAuthChkResponseDto;
import com.eemgu.usedproducts.domain.dto.response.auth.EmailAuthResponseDto;
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
}
