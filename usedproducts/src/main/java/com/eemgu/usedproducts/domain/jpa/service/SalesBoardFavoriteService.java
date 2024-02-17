package com.eemgu.usedproducts.domain.jpa.service;

import com.eemgu.usedproducts.domain.jpa.repository.SalesBoardFavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SalesBoardFavoriteService {
    private final SalesBoardFavoriteRepository salesBoardFavoriteRepository;
}
