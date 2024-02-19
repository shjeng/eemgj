package com.eemgu.usedproducts.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class TagEntity {
    @Id @GeneratedValue
    @Column(name = "tag_id")
    private Long id;

    @Column(name = "tag_name")
    private String name;

    public TagEntity(String name) {
        this.name = name;
    }

    // tag 받는 메서드
    public static List<TagEntity> dtoTags(String[] dtoTags){
        List<TagEntity> tagEntities = new ArrayList<>();
        for (String dtoTag : dtoTags) {
            tagEntities.add(new TagEntity(dtoTag));
        }
        return tagEntities;
    }
}
