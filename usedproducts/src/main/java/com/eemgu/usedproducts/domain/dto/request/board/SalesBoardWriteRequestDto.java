package com.eemgu.usedproducts.domain.dto.request.board;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class SalesBoardWriteRequestDto {
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotNull
    private Integer price;
    @NotEmpty
    private String[] categorys;
    @NotBlank
    private String transaction;
    @NotBlank
    private String address;
    private String[] tags;
    private String[] imageUrls;
}
