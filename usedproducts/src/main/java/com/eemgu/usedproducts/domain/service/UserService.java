package com.eemgu.usedproducts.domain.service;


import com.eemgu.usedproducts.domain.dto.response.user.GetUserResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


public interface UserService {

    ResponseEntity<? super GetUserResponseDto> getUser(String email);
}
