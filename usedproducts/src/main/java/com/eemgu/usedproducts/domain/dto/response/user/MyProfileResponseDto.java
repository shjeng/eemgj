package com.eemgu.usedproducts.domain.dto.response.user;

import com.eemgu.usedproducts.domain.common.ResponseCode;
import com.eemgu.usedproducts.domain.common.ResponseMessage;
import com.eemgu.usedproducts.domain.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
public class MyProfileResponseDto extends ResponseDto {
    private String nickname;
    private String profileImage;
    private String email;

    private MyProfileResponseDto(String nickname, String profileImage) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    // 로그인 했을 때 내 프로필 이미지와 닉네임 불러오기
    public ResponseEntity<? super MyProfileResponseDto> succuess(String nickname, String profileImage){
        return ResponseEntity.ok(new MyProfileResponseDto(nickname,profileImage));
    }
}
