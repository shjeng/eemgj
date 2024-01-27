package com.eemgu.usedproducts.domain.service;

import com.eemgu.usedproducts.domain.dto.request.auth.EmailAuthChkRequestDto;
import com.eemgu.usedproducts.domain.dto.request.auth.EmailAuthRequestDto;
import com.eemgu.usedproducts.domain.dto.response.auth.EmailAuthChkResponseDto;
import com.eemgu.usedproducts.domain.dto.response.auth.EmailAuthResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    // 이메일 인증 요청
    ResponseEntity<? super EmailAuthResponseDto> emailAuth(EmailAuthRequestDto dto);

    // 이메일 인증 확인
    ResponseEntity<? super EmailAuthChkResponseDto> emailAuthChk(EmailAuthChkRequestDto dto);
}
