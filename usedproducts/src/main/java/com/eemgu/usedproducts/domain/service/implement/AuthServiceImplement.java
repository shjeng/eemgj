package com.eemgu.usedproducts.domain.service.implement;

import com.eemgu.usedproducts.domain.Entity.AuthNumber;
import com.eemgu.usedproducts.domain.Entity.UserEntity;
import com.eemgu.usedproducts.domain.common.RandomNumber;
import com.eemgu.usedproducts.domain.dto.request.auth.EmailAuthChkRequestDto;
import com.eemgu.usedproducts.domain.dto.request.auth.EmailAuthRequestDto;
import com.eemgu.usedproducts.domain.dto.response.auth.EmailAuthChkResponseDto;
import com.eemgu.usedproducts.domain.dto.response.auth.EmailAuthResponseDto;
import com.eemgu.usedproducts.domain.jpa.service.AuthNumberService;
import com.eemgu.usedproducts.domain.jpa.service.UserEntityService;
import com.eemgu.usedproducts.domain.provider.EmailProvider;
import com.eemgu.usedproducts.domain.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {

    private final AuthNumberService authNumberService;
    private final UserEntityService userEntityService;
    private final EmailProvider emailProvider;
    @Override // 이메일 인증 요청
    public ResponseEntity<? super EmailAuthResponseDto> emailAuth(EmailAuthRequestDto dto) {
        try{
            String email = dto.getEmail();
            authNumberService.deleteByEmailPhone(email);
            Optional<UserEntity> userOptional = userEntityService.findByEmail(email);
            if(userOptional.isPresent()) return EmailAuthResponseDto.duplicateEmail(); // 중복 이메일 확인

            String randomNumber = RandomNumber.getRandomNumber(); // 랜덤 인증 번호
            boolean isSucceed = emailProvider.sendMail(email, randomNumber); // 메일 전송
            if(!isSucceed) return EmailAuthResponseDto.mailSendFail(); // 메일 전송 실패

            AuthNumber authNumber = new AuthNumber(email,randomNumber); // 인증번호와 이메일을 담아줌
            authNumberService.save(authNumber);

        } catch (Exception e){
            e.printStackTrace();
            return EmailAuthResponseDto.databaseError();
        }
        return EmailAuthResponseDto.success();
    }

    @Override // 이메일 인증 확인
    public ResponseEntity<? super EmailAuthChkResponseDto> emailAuthChk(EmailAuthChkRequestDto dto) {
        String email = dto.getEmail();
        String dtoGetAuthNumber = dto.getEmailAuthValue();
        try{
            Optional<UserEntity> userOptional = userEntityService.findByEmail(email);
            if(userOptional.isPresent()) return EmailAuthChkResponseDto.duplicateEmail(); // 중복 이메일 
            Optional<AuthNumber> authNumberOptional = authNumberService.findByEmailPhone(email);
            if(authNumberOptional.isEmpty()) return EmailAuthChkResponseDto.validationFailEmail(); // 유효하지 않은 이메일인 경우

            AuthNumber authNumber = authNumberOptional.get();
            if(!authNumber.getAuthNumber().equals(dtoGetAuthNumber))
                return EmailAuthChkResponseDto.validationFailEmail(); // 인증 번호가 틀렸을 경우

            authNumberService.deleteByEmailPhone(email);
        } catch (Exception e){
            e.printStackTrace();
            return EmailAuthChkResponseDto.databaseError();
        }
        return EmailAuthChkResponseDto.success(email);
    }
}
