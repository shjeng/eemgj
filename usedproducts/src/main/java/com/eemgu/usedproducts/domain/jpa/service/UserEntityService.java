package com.eemgu.usedproducts.domain.jpa.service;

import com.eemgu.usedproducts.domain.Entity.UserEntity;
import com.eemgu.usedproducts.domain.jpa.repository.UserEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserEntityService {
    private final UserEntityRepository userEntityRepository;

    // email로 회원을 찾는 메서드
    public Optional<UserEntity> findByEmail(String email){
        return userEntityRepository.findByEmail(email);
    }
}
