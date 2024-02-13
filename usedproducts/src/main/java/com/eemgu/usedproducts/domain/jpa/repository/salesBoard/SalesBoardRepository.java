package com.eemgu.usedproducts.domain.jpa.repository.salesBoard;

import com.eemgu.usedproducts.domain.Entity.SalesBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SalesBoardRepository extends JpaRepository<SalesBoard,Long> {

}
