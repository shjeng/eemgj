package com.eemgu.usedproducts.domain.common;

import org.springframework.stereotype.Service;

public class RandomNumber {
    public static String getRandomNumber(){
        StringBuilder stringBuilder = new StringBuilder();
        for(int i=0;i<6;i++){
            stringBuilder.append((int) (Math.random() * 10));
        }
        return stringBuilder.toString();
    }
}
