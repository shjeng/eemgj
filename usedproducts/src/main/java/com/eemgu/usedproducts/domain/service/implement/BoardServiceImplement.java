package com.eemgu.usedproducts.domain.service.implement;

import com.eemgu.usedproducts.domain.Entity.*;
import com.eemgu.usedproducts.domain.dto.request.board.SalesBoardWriteRequestDto;
import com.eemgu.usedproducts.domain.dto.response.board.SalesBoardWriteResponseDto;
import com.eemgu.usedproducts.domain.jpa.service.*;
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
    private final ImageService imageService;
    @Override
    public ResponseEntity<? super SalesBoardWriteResponseDto> postSalesBoardWrite(SalesBoardWriteRequestDto dto, String email) {
        Long boardId = null;
        try {
            Optional<UserEntity> optionalUser = userEntityService.findByEmail(email);
            if(optionalUser.isEmpty()) return SalesBoardWriteResponseDto.unauthorizedEmail();
            SalesBoard salesBoard = new SalesBoard(dto);
            SalesBoard saveSalesBoard = salesBoardService.save(salesBoard); // 게시물 저장
            boardId = saveSalesBoard.getId();

            String[] imageUrls = dto.getImageUrls();
            List<ImageEntity> imageEntityList = new ArrayList<>();
            for(String imgUrl : imageUrls){
                imageEntityList.add(new ImageEntity(imgUrl,saveSalesBoard));
            }
            imageService.saveAll(imageEntityList); // 이미지 저장

            String[] tags = dto.getTags();
            List<TagEntity> tagEntities = TagEntity.dtoTags(tags);
            List<TagEntity> saveTags = tagService.saveAll(tagEntities); // 게시물 태그 저장

            List<SalesBoardTag> salesBoardTags = new ArrayList<>();
            saveTags.forEach(tag -> salesBoardTags.add(new SalesBoardTag(saveSalesBoard,tag))); // 게시글+태그 데이터 저장
            salesBoardTagService.saveAll(salesBoardTags);
        } catch (Exception e){
            e.printStackTrace();
            SalesBoardWriteResponseDto.databaseError();
        }
        return SalesBoardWriteResponseDto.success(boardId);
    }
}
