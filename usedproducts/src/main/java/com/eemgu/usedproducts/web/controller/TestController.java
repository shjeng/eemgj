package com.eemgu.usedproducts.web.controller;

import com.eemgu.usedproducts.domain.Entity.UserEntity;
import com.eemgu.usedproducts.domain.jpa.service.UserEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TestController {
    private final UserEntityService userEntityService;

    @GetMapping("/auth/get")
    public List<UserEntity> get(){
        return userEntityService.findAll();
    }
}
