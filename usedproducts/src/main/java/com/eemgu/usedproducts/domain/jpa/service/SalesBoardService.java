package com.eemgu.usedproducts.domain.jpa.service;

import com.eemgu.usedproducts.domain.Entity.SalesBoard;
import com.eemgu.usedproducts.domain.jpa.repository.salesBoard.SalesBoardJoinRepository;
import com.eemgu.usedproducts.domain.jpa.repository.salesBoard.SalesBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SalesBoardService {

    private final SalesBoardRepository salesBoardRepository;
    private final SalesBoardJoinRepository salesBoardJoinRepository;

    // 판매 게시글, 작성한 유저 정보, 카테고리, 이미지, 태그
    public Optional<SalesBoard> findFetchCategorysImagesTagsById(Long salesBoardId){
        return salesBoardJoinRepository.findFetchCategorysImagesTagsById(salesBoardId);
    }
    @Transactional
    public SalesBoard save(SalesBoard salesBoard){
        return salesBoardRepository.save(salesBoard);
    }
}
