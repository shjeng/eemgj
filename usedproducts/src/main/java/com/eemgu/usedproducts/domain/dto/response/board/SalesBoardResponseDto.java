package com.eemgu.usedproducts.domain.dto.response.board;

import com.eemgu.usedproducts.domain.common.ResponseCode;
import com.eemgu.usedproducts.domain.common.ResponseMessage;
import com.eemgu.usedproducts.domain.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class SalesBoardResponseDto extends ResponseDto {
    public SalesBoardResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<SalesBoardResponseDto> success(){ // 글 작성 성공
        return ResponseEntity.status(HttpStatus.OK).body(new SalesBoardResponseDto());
    }
    public static ResponseEntity<ResponseDto> unauthorizedEmail(){ // 없는 유저
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseDto(ResponseCode.NOT_EXISTED_USER,ResponseMessage.NOT_EXISTED_BOARD));
    }
}
