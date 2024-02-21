package com.eemgu.usedproducts.web.controller;

import com.eemgu.usedproducts.domain.dto.request.board.GetSalesBoardRequestDto;
import com.eemgu.usedproducts.domain.dto.request.board.SalesBoardWriteRequestDto;
import com.eemgu.usedproducts.domain.dto.response.board.SalesBoardDetailResponseDto;
import com.eemgu.usedproducts.domain.dto.response.board.SalesBoardFavoriteResponseDto;
import com.eemgu.usedproducts.domain.dto.response.board.SalesBoardWriteResponseDto;
import com.eemgu.usedproducts.domain.service.BoardService;
import jakarta.validation.Valid;
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

    @GetMapping("/get-sales-board") // 게시물 불러오기
    public ResponseEntity<? super SalesBoardDetailResponseDto> getSalesBoard(
            @RequestParam(name = "email", required = false) String email, @RequestParam(name = "boardId") Long boardId){
        return boardService.getSalesBoardDetail(email, boardId);
    }

    @PostMapping("/sales") // 게시물 작성
    public ResponseEntity<? super SalesBoardWriteResponseDto> salesBoardWrite(
            @RequestBody @Valid SalesBoardWriteRequestDto dto, @AuthenticationPrincipal String email){
        return boardService.postSalesBoardWrite(dto,email);
    }

    @PutMapping("/favorite") // 좋아요 버튼 클릭
    public ResponseEntity<? super SalesBoardFavoriteResponseDto>salesBoardFavorite(
            @RequestParam("boardId") Long boardId,@AuthenticationPrincipal String email){
        return boardService.putSalesBoardFavorite(boardId,email);
    }
}
