package com.eemgu.usedproducts.domain.service.implement;

import com.eemgu.usedproducts.domain.Entity.SalesBoard;
import com.eemgu.usedproducts.domain.Entity.SalesBoardTag;
import com.eemgu.usedproducts.domain.Entity.TagEntity;
import com.eemgu.usedproducts.domain.Entity.UserEntity;
import com.eemgu.usedproducts.domain.dto.request.board.SalesBoardRequestDto;
import com.eemgu.usedproducts.domain.dto.response.board.SalesBoardResponseDto;
import com.eemgu.usedproducts.domain.jpa.service.SalesBoardService;
import com.eemgu.usedproducts.domain.jpa.service.SalesBoardTagService;
import com.eemgu.usedproducts.domain.jpa.service.TagService;
import com.eemgu.usedproducts.domain.jpa.service.UserEntityService;
import com.eemgu.usedproducts.domain.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {

    private final UserEntityService userEntityService;
    private final SalesBoardService salesBoardService;
    private final TagService tagService;
    private final SalesBoardTagService salesBoardTagService;
    @Override
    public ResponseEntity<? super SalesBoardResponseDto> postSalesBoardWrite(SalesBoardRequestDto dto, String email) {
        Long boardId = null;
        try {
            Optional<UserEntity> optionalUser = userEntityService.findByEmail(email);
            if(optionalUser.isPresent()) return SalesBoardResponseDto.unauthorizedEmail();
            SalesBoard salesBoard = new SalesBoard(dto);
            SalesBoard saveSalesBoard = salesBoardService.save(salesBoard); // 게시물 저장
            boardId = saveSalesBoard.getId();
            
            String[] tags = dto.getTags();
            List<TagEntity> tagEntities = TagEntity.dtoTags(tags);
            List<TagEntity> saveTags = tagService.saveAll(tagEntities); // 게시물 태그 저장

            List<SalesBoardTag> salesBoardTags = new ArrayList<>();
            saveTags.forEach(tag -> salesBoardTags.add(new SalesBoardTag(saveSalesBoard,tag))); // 게시글+태그 데이터 저장
            salesBoardTagService.saveAll(salesBoardTags);
        } catch (Exception e){
            e.printStackTrace();
            SalesBoardResponseDto.databaseError();
        }
        return SalesBoardResponseDto.success(boardId);
    }
}
