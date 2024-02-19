package com.eemgu.usedproducts.domain.dto.object;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
public class SalesBoardDetailDto {
    private List<String> categorys;
    private String address;
    private String title;
    private String content;
    private int price;
    private boolean salesCompleted;
    private LocalDateTime writeDateTime;
    private List<String> salesBoardImages;
    private List<String> tags;
    private boolean favorite;
}
