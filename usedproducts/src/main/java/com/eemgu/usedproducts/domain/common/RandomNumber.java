package com.eemgu.usedproducts.domain.common;

import org.springframework.stereotype.Service;

public class RandomNumber { // 인증 번호 랜덤 생성
    public static String getRandomNumber(){
        StringBuilder stringBuilder = new StringBuilder();
        for(int i=0;i<6;i++){
            stringBuilder.append((int) (Math.random() * 10));
        }
        return stringBuilder.toString();
    }
}
