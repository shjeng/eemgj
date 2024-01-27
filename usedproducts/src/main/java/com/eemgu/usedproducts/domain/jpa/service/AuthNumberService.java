package com.eemgu.usedproducts.domain.jpa.service;

import com.eemgu.usedproducts.domain.Entity.AuthNumber;
import com.eemgu.usedproducts.domain.jpa.repository.AuthNumberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthNumberService {
    private final AuthNumberRepository authNumberRepository;

    public void save(AuthNumber authNumber){
        authNumberRepository.save(authNumber);
    }
    public void delete(AuthNumber authNumber){
        authNumberRepository.delete(authNumber);
    }
}
