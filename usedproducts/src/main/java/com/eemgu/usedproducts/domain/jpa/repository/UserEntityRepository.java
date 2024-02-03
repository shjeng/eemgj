package com.eemgu.usedproducts.domain.jpa.repository;

import com.eemgu.usedproducts.domain.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByNickname(String nickname);

    List<UserEntity> findAll();
}
