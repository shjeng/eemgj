package com.eemgu.usedproducts.domain.jpa.service;

import com.eemgu.usedproducts.domain.Entity.SalesBoard;
import com.eemgu.usedproducts.domain.jpa.repository.SalesBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SalesBoardService {

    private final SalesBoardRepository salesBoardRepository;

    public SalesBoard save(SalesBoard salesBoard){
        return salesBoardRepository.save(salesBoard);
    }
}
