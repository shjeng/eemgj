package com.eemgu.usedproducts.domain.service;


import com.eemgu.usedproducts.domain.dto.response.user.GetLoginUserResponseDto;
import org.springframework.http.ResponseEntity;


public interface UserService {

    ResponseEntity<? super GetLoginUserResponseDto> getLoginUser(String email);
}
