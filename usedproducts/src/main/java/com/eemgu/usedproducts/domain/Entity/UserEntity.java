package com.eemgu.usedproducts.domain.Entity;

import com.eemgu.usedproducts.domain.dto.request.auth.SignUpRequestDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class UserEntity extends BaseEntity{
    @Id @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_email")
    private String email; // 이메일
    @Column(name = "user_password")
    private String password; // 비밀번호
    @Column(name = "user_phone")
    private String phone; // 핸드폰
    @Column(name = "user_nickname")
    private String nickname; // 닉네임
    @Column(name = "user_address")
    private String address; // 주소
    @Column(name = "user_detail_address")
    private String detailAddress; // 상세주소

    public UserEntity(SignUpRequestDto dto){
        email = dto.getEmail();
        password = dto.getPassword();
        phone = dto.getPhone();
        nickname = dto.getNickname();
        address = dto.getAddress();
        detailAddress = dto.getDetailAddress();
    }
}
