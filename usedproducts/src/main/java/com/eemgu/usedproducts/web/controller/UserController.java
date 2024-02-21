package com.eemgu.usedproducts.web.controller;

import com.eemgu.usedproducts.domain.dto.object.UserDto;
import com.eemgu.usedproducts.domain.dto.response.user.GetLoginUserResponseDto;
import com.eemgu.usedproducts.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@Slf4j
public class UserController {

    private final UserService userService;

//    @GetMapping("/{email}")
//    public ResponseEntity<? super getLoginUserResponseDto> getLoginUser(@PathVariable("email") String email){
//        return null;
//    }
    @GetMapping("")
    public ResponseEntity<? super GetLoginUserResponseDto> getMyProfile(@AuthenticationPrincipal String email){
        return userService.getLoginUser(email);
    }
}
