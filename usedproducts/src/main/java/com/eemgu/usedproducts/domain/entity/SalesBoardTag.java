package com.eemgu.usedproducts.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class SalesBoardTag {
    @Id @GeneratedValue
    @Column(name = "sales_board_tag_id")
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sales_board_id")
    private SalesBoard salesBoard;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private TagEntity tag;

    public SalesBoardTag(SalesBoard salesBoard, TagEntity tag) {
        this.salesBoard = salesBoard;
        this.tag = tag;
    }
}
