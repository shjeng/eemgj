package com.eemgu.usedproducts.domain.dto.response.user;

import com.eemgu.usedproducts.domain.common.ResponseCode;
import com.eemgu.usedproducts.domain.common.ResponseMessage;
import com.eemgu.usedproducts.domain.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetUserResponseDto extends ResponseDto {

    private GetUserResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<? super  GetUserResponseDto> success(){
        return ResponseEntity.status(HttpStatus.OK).body(new GetUserResponseDto());
    }
}
