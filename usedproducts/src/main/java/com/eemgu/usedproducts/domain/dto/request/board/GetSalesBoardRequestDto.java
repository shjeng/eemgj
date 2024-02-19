package com.eemgu.usedproducts.domain.dto.request.board;

import lombok.Data;

@Data
public class GetSalesBoardRequestDto {
    private Long boardId;
    private String email;
}
