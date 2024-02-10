package com.eemgu.usedproducts.domain.dto.request.board;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SalesBoardWriteRequestDto {
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotNull
    private Integer price;
    @NotBlank
    private String[] categorys;
    @NotBlank
    private String transaction;
    private String[] tags;
    private String[] imageUrls;
}
