package com.eemgu.usedproducts.domain.service;

import com.eemgu.usedproducts.domain.dto.request.board.SalesBoardWriteRequestDto;
import com.eemgu.usedproducts.domain.dto.response.board.SalesBoardWriteResponseDto;
import org.springframework.http.ResponseEntity;

public interface BoardService {

    ResponseEntity<? super SalesBoardWriteResponseDto> postSalesBoardWrite(SalesBoardWriteRequestDto dto, String email);
}
