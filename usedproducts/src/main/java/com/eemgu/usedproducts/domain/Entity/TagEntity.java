package com.eemgu.usedproducts.domain.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class TagEntity {
    @Id @GeneratedValue
    @Column(name = "tag_id")
    private Long id;

    @Column(name = "tag_name")
    private String name;
}
