package com.eemgu.usedproducts.domain.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class EmailAuthChkRequestDto {
    @NotBlank
    private String email;
    @NotBlank
    private String authNumber;
}
