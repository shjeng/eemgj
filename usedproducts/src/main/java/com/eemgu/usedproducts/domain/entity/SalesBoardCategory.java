package com.eemgu.usedproducts.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class SalesBoardCategory {
    @Id @GeneratedValue
    @Column(name = "sales_board_category_id")
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "sales_board_id")
    private SalesBoard salesBoard;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}
