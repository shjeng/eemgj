package com.eemgu.usedproducts.domain.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Category {

    @Id @GeneratedValue
    @Column(name = "category_id")
    private Integer id;

    @Column(name = "category_name")
    private String name;
}
