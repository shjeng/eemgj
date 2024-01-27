package com.eemgu.usedproducts.domain.jpa.repository;

import com.eemgu.usedproducts.domain.Entity.AuthNumber;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthNumberRepository extends JpaRepository<AuthNumber,Long> {

}
