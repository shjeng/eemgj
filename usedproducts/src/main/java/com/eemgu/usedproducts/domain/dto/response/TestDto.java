package com.eemgu.usedproducts.domain.dto.response;

import com.eemgu.usedproducts.domain.Entity.UserEntity;
import com.eemgu.usedproducts.domain.common.ResponseCode;
import com.eemgu.usedproducts.domain.common.ResponseMessage;
import com.eemgu.usedproducts.domain.dto.ResponseDto;
import com.eemgu.usedproducts.domain.jpa.service.UserEntityService;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class TestDto extends ResponseDto {

    List<UserEntity> teamNames;
    public TestDto(List<UserEntity> teamNames) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.teamNames = teamNames;
    }

    public static ResponseEntity<? super TestDto> test(List<UserEntity> teamNames){
        return ResponseEntity.ok(new TestDto(teamNames));
    }
}
