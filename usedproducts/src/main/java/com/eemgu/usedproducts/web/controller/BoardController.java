package com.eemgu.usedproducts.web.controller;

import com.eemgu.usedproducts.domain.dto.request.board.SalesBoardWriteRequestDto;
import com.eemgu.usedproducts.domain.dto.response.board.SalesBoardDetailResponseDto;
import com.eemgu.usedproducts.domain.dto.response.board.SalesBoardWriteResponseDto;
import com.eemgu.usedproducts.domain.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
@Slf4j
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/get-sales-board")
    public ResponseEntity<? super SalesBoardDetailResponseDto> getSalesBoard(
            @RequestParam(name = "boardId") Long boardId){
        log.info("게시물 아이디 : {}",boardId);
        return boardService.getSalesBoardDetail(boardId);
    }

    @PostMapping("/sales")
    public ResponseEntity<? super SalesBoardWriteResponseDto> salesBoardWrite(
            @RequestBody SalesBoardWriteRequestDto dto, @AuthenticationPrincipal String email){
        return boardService.postSalesBoardWrite(dto,email);
    }
}
