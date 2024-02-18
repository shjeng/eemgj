package com.eemgu.usedproducts.domain.jpa.service;

import com.eemgu.usedproducts.domain.Entity.SalesBoard;
import com.eemgu.usedproducts.domain.Entity.SalesBoardFavorite;
import com.eemgu.usedproducts.domain.Entity.UserEntity;
import com.eemgu.usedproducts.domain.jpa.repository.SalesBoardFavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SalesBoardFavoriteService {
    private final SalesBoardFavoriteRepository salesBoardFavoriteRepository;

    @Transactional
    public void save(SalesBoardFavorite salesBoardFavorite){
        salesBoardFavoriteRepository.save(salesBoardFavorite);
    }
    @Transactional
    public void delete(SalesBoardFavorite salesBoardFavorite){
        salesBoardFavoriteRepository.delete(salesBoardFavorite);
    }

    public Optional<SalesBoardFavorite> findBySalesBoardAndUserEntity(SalesBoard salesBoard, UserEntity userEntity){
        return salesBoardFavoriteRepository.findBySalesBoardAndUserEntity(salesBoard,userEntity);
    }
}
