package com.eemgu.usedproducts.domain.jpa.repository;

import com.eemgu.usedproducts.domain.entity.SalesBoard;
import com.eemgu.usedproducts.domain.entity.SalesBoardFavorite;
import com.eemgu.usedproducts.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SalesBoardFavoriteRepository extends JpaRepository<SalesBoardFavorite,Long> {


    Optional<SalesBoardFavorite> findBySalesBoardAndUserEntity(SalesBoard salesBoard, UserEntity userEntity);

    @Query(" select bf from SalesBoardFavorite bf where bf.userEntity.email =:userEntityEmail and bf.salesBoard =:salesBoard")
    Optional<SalesBoardFavorite> findByUserEntityEmailAndSalesBoard(@Param("userEntityEmail") String userEntityEmailm, @Param("salesBoard") SalesBoard salesBoard);
}
