package com.eemgu.usedproducts.domain.jpa.repository;

import com.eemgu.usedproducts.domain.Entity.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRespository extends JpaRepository<TagEntity, Long> {

}
