package com.eemgu.usedproducts.domain.Entity;

import com.eemgu.usedproducts.domain.dto.request.board.SalesBoardRequestDto;
import com.eemgu.usedproducts.domain.dto.response.board.SalesBoardResponseDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Entity
public class SalesBoard extends BaseEntity{
    // 판매 게시글
    @Id
    @GeneratedValue
    @Column(name = "sales_board_id")
    private Long id;

    private String title;
    private String content;
    private Integer price;
    private String transaction;

    @OneToMany(mappedBy = "salesBoard")
    private List<SalesBoardCategory> salesBoardCategories = new ArrayList<>();
    @OneToMany(mappedBy = "salesBoard")
    private List<ImageEntity> images = new ArrayList<>();
    @OneToMany(mappedBy = "salesBoard")
    private List<SalesBoardTag> tags = new ArrayList<>();
    public SalesBoard(SalesBoardRequestDto dto) {
        title = dto.getTitle();
        content = dto.getContent();
        price = dto.getPrice();
        transaction = dto.getTransaction();
    }
}
