package com.eemgu.usedproducts.domain.dto.response.board;

import com.eemgu.usedproducts.domain.common.ResponseCode;
import com.eemgu.usedproducts.domain.common.ResponseMessage;
import com.eemgu.usedproducts.domain.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SalesBoardFavoriteResponseDto extends ResponseDto {
    private boolean favoriteChk = false;
    public SalesBoardFavoriteResponseDto(boolean favoriteChk) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.favoriteChk = favoriteChk;
    }
    public static ResponseEntity<SalesBoardFavoriteResponseDto> success(boolean favoriteChk){ // 성공
        return ResponseEntity.status(HttpStatus.OK).body(new SalesBoardFavoriteResponseDto(favoriteChk));
    }

    public static ResponseEntity<ResponseDto> noExistedBoard(){ // 없는 게시물
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(ResponseCode.NOT_EXISTED_BOARD,ResponseMessage.NOT_EXISTED_BOARD));
    }

    public static ResponseEntity<ResponseDto> noExistedUser(){ // 존재하지 않는 유저
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(ResponseCode.NOT_EXISTED_USER,ResponseMessage.NOT_EXISTED_USER));
    }
}
