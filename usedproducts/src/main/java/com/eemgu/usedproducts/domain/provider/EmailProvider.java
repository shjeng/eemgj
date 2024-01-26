package com.eemgu.usedproducts.domain.provider;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailProvider {
    private final JavaMailSender javaMailSender;
    private final String SUBJECT = "[뜨거] 인증메일입니다.";

    public boolean sendCertificationMail(String email, String cfertificationNumber){

        try{
            // MimeMessage 클래스는 이메일의 MIME(Multipurpose Internet Mail Extensions) 형식의 데이터를 표현
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message,true);
            String htmlContent = getCertificationMessage(cfertificationNumber);
            messageHelper.setTo(email);
            messageHelper.setSubject(SUBJECT);
            messageHelper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    private String getCertificationMessage(String cfertificationNumber){
        StringBuilder certificationMessage = new StringBuilder();
        certificationMessage.append("<h1 style='text-align: center;>[뜨거] 인증메일</h1>");
        certificationMessage.append("<h3 style='text-align>인증 코드 : <strong style='font-size: 32px; letter-spacing: 8px;>'"+ certificationMessage+ "</string></h3>");
        return certificationMessage.toString();
    }
}
