package com.eemgu.usedproducts.domain.dto.response.user;

import com.eemgu.usedproducts.domain.common.ResponseCode;
import com.eemgu.usedproducts.domain.common.ResponseMessage;
import com.eemgu.usedproducts.domain.dto.ResponseDto;
import com.eemgu.usedproducts.domain.dto.object.UserDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetLoginUserResponseDto extends ResponseDto {

    private UserDto user;

    private GetLoginUserResponseDto(UserDto dto) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        user = dto;
    }

    public static ResponseEntity<GetLoginUserResponseDto> success(UserDto dto){
        return ResponseEntity.status(HttpStatus.OK).body(new GetLoginUserResponseDto(dto));
    }
    public static ResponseEntity<ResponseDto> noExistedUser(){ // 존재하지 않는 유저
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(ResponseCode.NOT_EXISTED_USER,ResponseMessage.NOT_EXISTED_USER));
    }
}
