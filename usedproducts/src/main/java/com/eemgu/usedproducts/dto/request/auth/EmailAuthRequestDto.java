package com.eemgu.usedproducts.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class EmailAuthRequestDto {
    @NotBlank
    private String email;
    @NotBlank
    private String authNumber;
}
