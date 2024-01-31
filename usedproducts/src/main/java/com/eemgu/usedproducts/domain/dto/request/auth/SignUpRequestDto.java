package com.eemgu.usedproducts.domain.dto.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class SignUpRequestDto {
    @NotBlank @Email
    private String email;
    @NotBlank @Size(min = 8, max = 20)
    private String password;
    @NotBlank
    private String phone;
    @NotBlank
    private String nickname;
    @NotBlank
    private String address;
    private String detailAddress;

}
