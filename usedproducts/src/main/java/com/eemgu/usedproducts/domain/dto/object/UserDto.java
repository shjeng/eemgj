package com.eemgu.usedproducts.domain.dto.object;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private String email;
    private String nickname;
    private String profileImage;
    private String address;
}
