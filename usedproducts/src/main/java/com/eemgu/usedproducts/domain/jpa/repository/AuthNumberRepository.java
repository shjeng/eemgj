package com.eemgu.usedproducts.domain.jpa.repository;

import com.eemgu.usedproducts.domain.Entity.AuthNumber;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthNumberRepository extends JpaRepository<AuthNumber,Long> {

    void deleteByEmailPhone(String emailPhone);
    Optional<AuthNumber> findByEmailPhone(String emailPhone);
}
