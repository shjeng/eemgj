package com.eemgu.usedproducts.domain.jpa.repository;

import com.eemgu.usedproducts.domain.Entity.Category;
import com.eemgu.usedproducts.domain.Entity.SalesBoard;
import com.eemgu.usedproducts.domain.Entity.SalesBoardCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SalesBoardCategoryRepository extends JpaRepository<SalesBoardCategory,Long> {

    @Query("select sc from SalesBoardCategory sc " +
            " join fetch sc.category c " +
            " where sc.salesBoard =:salesBoard")
    List<Category> findFetchCategorysBySalesBoard(@Param("salesBoard") SalesBoard salesBoard);
}
