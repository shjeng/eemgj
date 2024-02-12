package com.eemgu.usedproducts.domain.dto.response.board;

import com.eemgu.usedproducts.domain.common.ResponseCode;
import com.eemgu.usedproducts.domain.common.ResponseMessage;
import com.eemgu.usedproducts.domain.dto.ResponseDto;
import lombok.Getter;

@Getter
public class SalesBoardDetailResponseDto extends ResponseDto {
    public SalesBoardDetailResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }
}
