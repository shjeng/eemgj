package com.eemgu.usedproducts.domain.dto.object;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Writer {
    private String profileImg;
    private String nickname;
    private String email;
}
