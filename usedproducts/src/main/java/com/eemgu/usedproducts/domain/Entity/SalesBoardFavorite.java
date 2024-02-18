package com.eemgu.usedproducts.domain.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class SalesBoardFavorite {
    @Id @GeneratedValue
    @Column(name = "favorite_sales_board_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sales_board_id")
    private SalesBoard salesBoard;

    public SalesBoardFavorite(UserEntity userEntity, SalesBoard salesBoard) {
        this.userEntity = userEntity;
        this.salesBoard = salesBoard;
    }
}
