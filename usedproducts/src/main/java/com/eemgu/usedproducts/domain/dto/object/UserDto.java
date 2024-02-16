package com.eemgu.usedproducts.domain.dto.object;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private String email;
    private String nickname;
    private String profileImage;
}
