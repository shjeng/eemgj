package com.eemgu.usedproducts.domain.dto.object;

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
