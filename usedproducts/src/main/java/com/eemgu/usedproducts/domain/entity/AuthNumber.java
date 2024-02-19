package com.eemgu.usedproducts.domain.entity;

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

    @Column(name = "email_phone")
    private String emailPhone;
    @Column(name = "auth_number")
    private String authNumber;

    public AuthNumber(String emailPhone, String authNumber) {
        this.emailPhone = emailPhone;
        this.authNumber = authNumber;
    }
}
