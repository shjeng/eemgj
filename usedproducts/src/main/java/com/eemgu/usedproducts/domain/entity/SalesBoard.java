package com.eemgu.usedproducts.domain.entity;

import com.eemgu.usedproducts.domain.dto.request.board.SalesBoardWriteRequestDto;
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
    @Column(name = "sales_board_title")
    private String title;
    @Column(name = "sales_board_content")
    private String content;
    @Column(name = "sales_board_price")
    private Integer price;
    @Column(name = "sales_board_transaction")
    private String transaction; // 거래 방법
    @Column(name = "sales_board_salesCompleted")
    private boolean salesCompleted = false; // 거래 완료 여부

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @OneToMany(mappedBy = "salesBoard")
    private List<SalesBoardCategory> salesBoardCategories = new ArrayList<>();
    @OneToMany(mappedBy = "salesBoard")
    private List<ImageEntity> images = new ArrayList<>();
    @OneToMany(mappedBy = "salesBoard")
    private List<SalesBoardTag> tags = new ArrayList<>();
    public SalesBoard(SalesBoardWriteRequestDto dto, UserEntity userEntity) {
        this.userEntity = userEntity;
        title = dto.getTitle();
        content = dto.getContent();
        price = dto.getPrice();
        transaction = dto.getTransaction();
    }
}
