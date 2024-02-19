package com.eemgu.usedproducts.domain.jpa.service;

import com.eemgu.usedproducts.domain.entity.SalesBoard;
import com.eemgu.usedproducts.domain.entity.SalesBoardFavorite;
import com.eemgu.usedproducts.domain.entity.UserEntity;
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

    public Optional<SalesBoardFavorite> findByUserEntityEmailAndSalesBoard(String userEntityEmail,SalesBoard salesBoard){
        return salesBoardFavoriteRepository.findByUserEntityEmailAndSalesBoard(userEntityEmail,salesBoard);
    }
    public Optional<SalesBoardFavorite> findBySalesBoardAndUserEntity(SalesBoard salesBoard, UserEntity userEntity){
        return salesBoardFavoriteRepository.findBySalesBoardAndUserEntity(salesBoard,userEntity);
    }
}
