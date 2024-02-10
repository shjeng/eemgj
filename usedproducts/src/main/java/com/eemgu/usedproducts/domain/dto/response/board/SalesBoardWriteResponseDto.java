package com.eemgu.usedproducts.domain.dto.response.board;

import com.eemgu.usedproducts.domain.common.ResponseCode;
import com.eemgu.usedproducts.domain.common.ResponseMessage;
import com.eemgu.usedproducts.domain.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SalesBoardWriteResponseDto extends ResponseDto {

    private Long boardId;

    public SalesBoardWriteResponseDto(Long boardId) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.boardId = boardId;
    }

    public static ResponseEntity<SalesBoardWriteResponseDto> success(Long boardId){ // 글 작성 성공
        return ResponseEntity.status(HttpStatus.OK).body(new SalesBoardWriteResponseDto(boardId));
    }
    public static ResponseEntity<ResponseDto> unauthorizedEmail(){ // 없는 유저
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseDto(ResponseCode.NOT_EXISTED_USER,ResponseMessage.NOT_EXISTED_USER));
    }
}