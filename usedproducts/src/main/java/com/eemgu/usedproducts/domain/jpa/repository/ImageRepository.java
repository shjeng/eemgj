package com.eemgu.usedproducts.domain.jpa.repository;

import com.eemgu.usedproducts.domain.Entity.ImageEntity;
import com.eemgu.usedproducts.domain.Entity.SalesBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<ImageEntity,Long> {
    List<ImageEntity> findBySalesBoard(SalesBoard salesBoard);
}
