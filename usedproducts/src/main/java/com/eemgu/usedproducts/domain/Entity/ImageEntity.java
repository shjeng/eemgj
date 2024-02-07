package com.eemgu.usedproducts.domain.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class ImageEntity {

    @Id @GeneratedValue
    @Column(name = "image_id")
    private Long id;

    @Column(name = "image_url")
    private String imageUrl;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sales_board_id")
    private SalesBoard salesBoard;


}
