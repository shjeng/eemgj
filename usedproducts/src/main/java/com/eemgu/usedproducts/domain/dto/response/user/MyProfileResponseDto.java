package com.eemgu.usedproducts.domain.dto.response.user;

import com.eemgu.usedproducts.domain.common.ResponseCode;
import com.eemgu.usedproducts.domain.common.ResponseMessage;
import com.eemgu.usedproducts.domain.dto.ResponseDto;
import lombok.Getter;

@Getter
public class MyProfileResponseDto extends ResponseDto {

    public MyProfileResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }
}
