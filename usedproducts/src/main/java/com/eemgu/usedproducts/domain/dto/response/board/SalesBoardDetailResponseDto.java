package com.eemgu.usedproducts.domain.dto.response.board;

import com.eemgu.usedproducts.domain.common.ResponseCode;
import com.eemgu.usedproducts.domain.common.ResponseMessage;
import com.eemgu.usedproducts.domain.dto.object.Writer;
import com.eemgu.usedproducts.domain.dto.object.SalesBoardDetail;
import com.eemgu.usedproducts.domain.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SalesBoardDetailResponseDto extends ResponseDto {

    private SalesBoardDetail salesBoardDetail;
    private Writer writer;

    public SalesBoardDetailResponseDto(SalesBoardDetail salesBoardDetail, Writer writer) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.salesBoardDetail = salesBoardDetail;
        this.writer = writer;
    }

    public static ResponseEntity<SalesBoardDetailResponseDto> success(SalesBoardDetail salesBoardDetail, Writer writer){
        return ResponseEntity.status(HttpStatus.OK).body(new SalesBoardDetailResponseDto(salesBoardDetail, writer));
    }
    public static ResponseEntity<ResponseDto> noExistSalesBoard(){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(ResponseCode.NOT_EXISTED_BOARD,ResponseMessage.NOT_EXISTED_BOARD));
    }
}
