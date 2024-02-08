package com.eemgu.usedproducts.domain.service;

import com.eemgu.usedproducts.domain.dto.request.board.SalesBoardRequestDto;
import com.eemgu.usedproducts.domain.dto.response.board.SalesBoardResponseDto;
import org.springframework.http.ResponseEntity;

public interface BoardService {

    ResponseEntity<? super SalesBoardResponseDto> postSalesBoardWrite(SalesBoardRequestDto dto, String email);
}
