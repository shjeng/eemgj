package com.eemgu.usedproducts.domain.service.implement;

import com.eemgu.usedproducts.domain.dto.request.board.GetSalesBoardRequestDto;
import com.eemgu.usedproducts.domain.entity.*;
import com.eemgu.usedproducts.domain.dto.object.ProfileImgNickname;
import com.eemgu.usedproducts.domain.dto.object.SalesBoardDetailDto;
import com.eemgu.usedproducts.domain.dto.request.board.SalesBoardWriteRequestDto;
import com.eemgu.usedproducts.domain.dto.response.board.SalesBoardDetailResponseDto;
import com.eemgu.usedproducts.domain.dto.response.board.SalesBoardFavoriteResponseDto;
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
    private final SalesBoardCategoryService salesBoardCategoryService;
    private final SalesBoardFavoriteService salesBoardFavoriteService;
    // get


    @Override // 판매 게시글 불러오기
    public ResponseEntity<? super SalesBoardDetailResponseDto> getSalesBoardDetail(GetSalesBoardRequestDto dto) {
        SalesBoardDetailDto salesBoardDetailDto;
        ProfileImgNickname profileImgNickname;
        try{
            if(dto.getBoardId() == null) return SalesBoardDetailResponseDto.noExistSalesBoard();
            Optional<SalesBoard> boardOptional = salesBoardService.findFetchCategorysImagesTagsById(dto.getBoardId());
            if(boardOptional.isEmpty()) return SalesBoardDetailResponseDto.noExistSalesBoard(); // 게시글이 없는 경우

            SalesBoard salesBoard = boardOptional.get(); // 게시글이 있는 경우 게시글 불러옴.

            boolean favoriteChk = false;
            Optional<SalesBoardFavorite> getFavorite = salesBoardFavoriteService.findByUserEntityEmailAndSalesBoard(dto.getEmail(), salesBoard);
            if(getFavorite.isPresent()){
                favoriteChk = true;
            } // 좋아요 버튼 눌렀는지 확인

            List<SalesBoardTag> salesBoardTags = salesBoard.getTags();
            List<Category> categoryEntitys = salesBoardCategoryService.findFetchCategoryBySalesBoard(salesBoard);
            List<ImageEntity> images = imageService.findBySalesBoard(salesBoard);
            // 아래는 dto에 넣을 데이터
            UserEntity userEntity = salesBoard.getUserEntity();
            List<String> getImages = images.stream().map(ImageEntity::getImageUrl).toList();
            List<String> getTags = salesBoardTags.stream().map(t -> t.getTag().getName()).toList(); // dto에 담아줄 tags
            List<String> getCategorys = categoryEntitys.stream().map(Category::getName).toList();

            salesBoardDetailDto = SalesBoardDetailDto.builder()
                    .categorys(getCategorys)
                    .address(userEntity.getAddress())
                    .title(salesBoard.getTitle())
                    .content(salesBoard.getContent())
                    .price(salesBoard.getPrice())
                    .salesCompleted(salesBoard.isSalesCompleted())
                    .writeDateTime(salesBoard.getCreateDate())
                    .salesBoardImages(getImages)
                    .tags(getTags)
                    .favorite(favoriteChk)

                    .build();

            profileImgNickname = ProfileImgNickname.builder()
                    .profileImg(userEntity.getProfileImage())
                    .email(userEntity.getEmail())
                    .nickname(userEntity.getNickname())
                    .build();
        } catch(Exception e){
            e.printStackTrace();
            return SalesBoardDetailResponseDto.databaseError();
        }
        return SalesBoardDetailResponseDto.success(salesBoardDetailDto,profileImgNickname);
    }

    // post
    @Override // 판매 게시글 작성
    public ResponseEntity<? super SalesBoardWriteResponseDto> postSalesBoardWrite(SalesBoardWriteRequestDto dto, String email) {
        Long boardId = null;
        try {
            Optional<UserEntity> optionalUser = userEntityService.findByEmail(email);
            if(optionalUser.isEmpty()) return SalesBoardWriteResponseDto.unauthorizedEmail();
            UserEntity userEntity = optionalUser.get();
            SalesBoard salesBoard = new SalesBoard(dto,userEntity);
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

    // put

    @Override // 판매 게시글 좋아요
    public ResponseEntity<? super SalesBoardFavoriteResponseDto> putSalesBoardFavorite(Long boardId, String email) {
        boolean favoriteChk = false;
        try{

            Optional<UserEntity> optionalUser = userEntityService.findByEmail(email);
            if(optionalUser.isEmpty()) return SalesBoardFavoriteResponseDto.noExistedUser(); // 존재하지 않는 유저
            UserEntity userEntity = optionalUser.get();

            Optional<SalesBoard> boardOptional = salesBoardService.findById(boardId);
            if(boardOptional.isEmpty()) return SalesBoardFavoriteResponseDto.noExistedBoard(); // 존재하지 않는 게시물인 경우
            SalesBoard salesBoard = boardOptional.get();

            Optional<SalesBoardFavorite> favoriteOptional = salesBoardFavoriteService.findBySalesBoardAndUserEntity(salesBoard, userEntity);
            if(favoriteOptional.isEmpty()){
                SalesBoardFavorite salesBoardFavorite = new SalesBoardFavorite(userEntity,salesBoard);
                salesBoardFavoriteService.save(salesBoardFavorite);
            } else{
                salesBoardFavoriteService.delete(favoriteOptional.get());
                favoriteChk = true;
            }


        }catch(Exception e){
            e.printStackTrace();
            SalesBoardFavoriteResponseDto.databaseError();
        }
        return SalesBoardFavoriteResponseDto.success(favoriteChk);
    }
}
