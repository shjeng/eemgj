package com.eemgu.usedproducts.domain.jpa.repository;

import com.eemgu.usedproducts.domain.Entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageEntity,Long> {
    
}
