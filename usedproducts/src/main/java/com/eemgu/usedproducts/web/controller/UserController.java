package com.eemgu.usedproducts.web.controller;

import com.eemgu.usedproducts.domain.dto.response.user.GetUserResponseDto;
import com.eemgu.usedproducts.domain.dto.response.user.MyProfileResponseDto;
import com.eemgu.usedproducts.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

//    private final UserService userService;

//    @GetMapping("/{email}")
//    public ResponseEntity<? super GetUserResponseDto> getUser(@PathVariable("email") String email){
//        return null;
//    }
//    @PostMapping("/my-profile")
//    public ResponseEntity<? super MyProfileResponseDto> getMyProfile(@AuthenticationPrincipal String email){
//        return null;
//    }
}
