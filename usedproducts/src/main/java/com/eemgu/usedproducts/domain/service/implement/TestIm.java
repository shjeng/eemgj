package com.eemgu.usedproducts.domain.service.implement;

import com.eemgu.usedproducts.domain.Entity.UserEntity;
import com.eemgu.usedproducts.domain.dto.response.TestDto;
import com.eemgu.usedproducts.domain.jpa.service.UserEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestIm {
    private final UserEntityService userEntityService;
    public ResponseEntity<? super TestDto> test(){
        List<UserEntity> all = userEntityService.findAll();
        return TestDto.test(all);
    }
}
