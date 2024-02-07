package com.eemgu.usedproducts.domain.jpa.repository;

import com.eemgu.usedproducts.domain.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
