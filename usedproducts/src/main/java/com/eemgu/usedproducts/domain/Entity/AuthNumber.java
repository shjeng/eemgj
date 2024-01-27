package com.eemgu.usedproducts.domain.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class AuthNumber {
    @Id @GeneratedValue
    private Long id;

    @Column(name = "email")
    private String emailOrPhone;
    @Column(name = "auth_number")
    private String authNumber;

    public AuthNumber(String emailOrPhone, String authNumber) {
        this.emailOrPhone = emailOrPhone;
        this.authNumber = authNumber;
    }
}
