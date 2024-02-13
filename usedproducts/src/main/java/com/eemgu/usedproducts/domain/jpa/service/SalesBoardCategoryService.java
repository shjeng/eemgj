package com.eemgu.usedproducts.domain.jpa.service;

import com.eemgu.usedproducts.domain.Entity.Category;
import com.eemgu.usedproducts.domain.Entity.SalesBoard;
import com.eemgu.usedproducts.domain.jpa.repository.SalesBoardCategoryRepository;
import com.eemgu.usedproducts.domain.jpa.repository.salesBoard.SalesBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class SalesBoardCategoryService {
    private final SalesBoardCategoryRepository salesBoardCategoryRepository;

    public List<Category> findFetchCategoryBySalesBoard(SalesBoard salesBoard){
        return salesBoardCategoryRepository.findFetchCategorysBySalesBoard(salesBoard);
    }
}
