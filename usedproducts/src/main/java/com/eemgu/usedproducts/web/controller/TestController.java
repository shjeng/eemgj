package com.eemgu.usedproducts.web.controller;

import com.eemgu.usedproducts.domain.Entity.UserEntity;
import com.eemgu.usedproducts.domain.dto.response.TestDto;
import com.eemgu.usedproducts.domain.jpa.service.UserEntityService;
import com.eemgu.usedproducts.domain.service.implement.TestIm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final TestIm testIm;

    @GetMapping("/api/auth/test")
    public ResponseEntity<? super TestDto> get(){

        return testIm.test();
    }
}
