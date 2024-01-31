package com.eemgu.usedproducts.domain.dto.response.auth;

import com.eemgu.usedproducts.domain.common.ResponseCode;
import com.eemgu.usedproducts.domain.common.ResponseMessage;
import com.eemgu.usedproducts.domain.dto.ResponseDto;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class SignUpResponseDto extends ResponseDto {

    public SignUpResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<SignUpResponseDto> success(){
        return ResponseEntity.status(HttpStatus.OK).body(new SignUpResponseDto());
    }

    public static ResponseEntity<ResponseDto> duplicateEmail(){ // 이메일 중복
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(ResponseCode.DUPLICATE_EMAIL,ResponseMessage.DUPLICATE_EMAIL));
    }

    public static ResponseEntity<ResponseDto> duplicateNickname(){ // 닉네임 중복
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(ResponseCode.DUPLICATE_NICKNAME,ResponseMessage.DUPLICATE_NICKNAME));
    }
}
