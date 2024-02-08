package com.eemgu.usedproducts.domain.jpa.service;

import com.eemgu.usedproducts.domain.Entity.TagEntity;
import com.eemgu.usedproducts.domain.jpa.repository.TagRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TagService {
    private final TagRespository tagRespository;

    public List<TagEntity> saveAll(List<TagEntity> tags){
        return tagRespository.saveAll(tags);
    }
}
