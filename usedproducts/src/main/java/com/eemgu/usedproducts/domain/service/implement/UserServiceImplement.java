package com.eemgu.usedproducts.domain.service.implement;

import com.eemgu.usedproducts.domain.entity.UserEntity;
import com.eemgu.usedproducts.domain.dto.object.UserDto;
import com.eemgu.usedproducts.domain.dto.response.user.GetLoginUserResponseDto;
import com.eemgu.usedproducts.domain.jpa.service.UserEntityService;
import com.eemgu.usedproducts.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserServiceImplement implements UserService {
    private final UserEntityService userEntityService;
    @Override
    public ResponseEntity<? super GetLoginUserResponseDto> getLoginUser(String email) {
        UserDto userDto;
        try{
            Optional<UserEntity> optionalUser = userEntityService.findByEmail(email);
            if(optionalUser.isEmpty()) return GetLoginUserResponseDto.noExistedUser(); // 존재하지 않는 유저
            UserEntity userEntity = optionalUser.get();
            userDto = UserDto.builder()
                    .email(userEntity.getEmail())
                    .nickname(userEntity.getNickname())
                    .profileImage(userEntity.getProfileImage())
                    .address(userEntity.getAddress())
                    .build();
        }catch(Exception e){
            e.printStackTrace();
            return GetLoginUserResponseDto.databaseError();
        }
        return GetLoginUserResponseDto.success(userDto);
    }
}
