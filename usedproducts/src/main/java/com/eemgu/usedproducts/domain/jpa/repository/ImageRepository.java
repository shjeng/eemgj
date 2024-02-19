package com.eemgu.usedproducts.domain.jpa.repository;

import com.eemgu.usedproducts.domain.entity.ImageEntity;
import com.eemgu.usedproducts.domain.entity.SalesBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<ImageEntity,Long> {
    List<ImageEntity> findBySalesBoard(SalesBoard salesBoard);
}
