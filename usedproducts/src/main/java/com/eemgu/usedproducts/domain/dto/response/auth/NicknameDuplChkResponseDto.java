package com.eemgu.usedproducts.domain.dto.response.auth;

import com.eemgu.usedproducts.domain.common.ResponseCode;
import com.eemgu.usedproducts.domain.common.ResponseMessage;
import com.eemgu.usedproducts.domain.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class NicknameDuplChkResponseDto extends ResponseDto{
    public NicknameDuplChkResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<? super NicknameDuplChkResponseDto> success(){
        NicknameDuplChkResponseDto responseBody = new NicknameDuplChkResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> nicknameDuplChk(){ // 중복 닉네임
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATE_NICKNAME,ResponseMessage.DUPLICATE_NICKNAME);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }


}
