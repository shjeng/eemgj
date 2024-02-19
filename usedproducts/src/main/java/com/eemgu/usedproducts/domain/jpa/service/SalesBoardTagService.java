package com.eemgu.usedproducts.domain.jpa.service;

import com.eemgu.usedproducts.domain.entity.SalesBoardTag;
import com.eemgu.usedproducts.domain.jpa.repository.SalesBoardTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class SalesBoardTagService {
    private final SalesBoardTagRepository salesBoardTagRepository;

    public void saveAll(List<SalesBoardTag> salesBoardTags){
        salesBoardTagRepository.saveAll(salesBoardTags);
    }
}
