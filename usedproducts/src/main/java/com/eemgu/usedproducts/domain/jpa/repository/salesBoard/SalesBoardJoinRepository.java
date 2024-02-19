package com.eemgu.usedproducts.domain.jpa.repository.salesBoard;

import com.eemgu.usedproducts.domain.entity.SalesBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SalesBoardJoinRepository extends JpaRepository<SalesBoard,Long> {
    // 카테고리와 이미지와 태그를 같이 불러오기.
    @Query("select sb from SalesBoard sb " +
            " join fetch sb.userEntity u" + // 작성자 정보
            " join fetch sb.tags st join fetch st.tag t " + // 게시물의 태그들
            " where sb.id =:id")
    Optional<SalesBoard> findFetchCategorysImagesTagsById(@Param("id") Long salesBoardId);
}
