package com.eemgu.usedproducts.domain.dto.response.board;

import com.eemgu.usedproducts.domain.common.ResponseCode;
import com.eemgu.usedproducts.domain.common.ResponseMessage;
import com.eemgu.usedproducts.domain.dto.Object.ProfileImgNickname;
import com.eemgu.usedproducts.domain.dto.Object.SalesBoardDetailDto;
import com.eemgu.usedproducts.domain.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SalesBoardDetailResponseDto extends ResponseDto {

    private SalesBoardDetailDto salesBoardDetailDto;
    private ProfileImgNickname profileImgNickname;

    public SalesBoardDetailResponseDto(SalesBoardDetailDto salesBoardDetailDto, ProfileImgNickname profileImgNickname) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.salesBoardDetailDto = salesBoardDetailDto;
        this.profileImgNickname = profileImgNickname;
    }

    public static ResponseEntity<SalesBoardDetailResponseDto> success(SalesBoardDetailDto salesBoardDetailDto, ProfileImgNickname profileImgNickname){
        return ResponseEntity.status(HttpStatus.OK).body(new SalesBoardDetailResponseDto(salesBoardDetailDto,profileImgNickname));
    }
    public static ResponseEntity<ResponseDto> noExistSalesBoard(){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(ResponseCode.NOT_EXISTED_BOARD,ResponseMessage.NOT_EXISTED_BOARD));
    }
}
