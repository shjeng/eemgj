package com.eemgu.usedproducts.domain.jpa.service;

import com.eemgu.usedproducts.domain.entity.Category;
import com.eemgu.usedproducts.domain.entity.SalesBoard;
import com.eemgu.usedproducts.domain.jpa.repository.SalesBoardCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class SalesBoardCategoryService {
    private final SalesBoardCategoryRepository salesBoardCategoryRepository;

    // SalesBoard의 카테고리 Fetch Join
    public List<Category> findFetchCategoryBySalesBoard(SalesBoard salesBoard){
        return salesBoardCategoryRepository.findFetchCategorysBySalesBoard(salesBoard);
    }

}
