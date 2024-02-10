package com.eemgu.usedproducts.web.controller;

import com.eemgu.usedproducts.domain.dto.request.board.SalesBoardWriteRequestDto;
import com.eemgu.usedproducts.domain.dto.response.board.SalesBoardWriteResponseDto;
import com.eemgu.usedproducts.domain.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    @PostMapping("/sales")
    public ResponseEntity<? super SalesBoardWriteResponseDto> salesBoardWrite(
            @RequestBody SalesBoardWriteRequestDto dto, @AuthenticationPrincipal String email){
        return boardService.postSalesBoardWrite(dto,email);
    }
}
