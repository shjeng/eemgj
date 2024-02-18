package com.eemgu.usedproducts.domain.jpa.repository;

import com.eemgu.usedproducts.domain.Entity.SalesBoard;
import com.eemgu.usedproducts.domain.Entity.SalesBoardFavorite;
import com.eemgu.usedproducts.domain.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SalesBoardFavoriteRepository extends JpaRepository<SalesBoardFavorite,Long> {


    Optional<SalesBoardFavorite> findBySalesBoardAndUserEntity(SalesBoard salesBoard, UserEntity userEntity);
}
