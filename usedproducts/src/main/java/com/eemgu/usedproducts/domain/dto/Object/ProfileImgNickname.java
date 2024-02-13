package com.eemgu.usedproducts.domain.dto.Object;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileImgNickname {
    private String profileImg;
    private String nickname;
    private String email;
}
