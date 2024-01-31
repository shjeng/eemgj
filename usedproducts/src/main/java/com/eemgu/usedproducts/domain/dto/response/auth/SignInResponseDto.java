package com.eemgu.usedproducts.domain.dto.response.auth;

import com.eemgu.usedproducts.domain.common.ResponseCode;
import com.eemgu.usedproducts.domain.common.ResponseMessage;
import com.eemgu.usedproducts.domain.dto.ResponseDto;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class SignInResponseDto extends ResponseDto {
    private String token;
    private int expirationTime;

    private SignInResponseDto(String token) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.token = token;
        this.expirationTime = 3600;
    }

    public static ResponseEntity<SignInResponseDto> success(String token){
        return ResponseEntity.status(HttpStatus.OK).body(new SignInResponseDto(token));
    }

    public static ResponseEntity<ResponseDto> signInFailed(){
        ResponseDto result = new ResponseDto(ResponseCode.SIGN_IN_FAIL,ResponseMessage.SIGN_IN_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
}
