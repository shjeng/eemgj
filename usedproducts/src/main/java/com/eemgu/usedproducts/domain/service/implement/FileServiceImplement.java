package com.eemgu.usedproducts.domain.service.implement;

import com.eemgu.usedproducts.domain.entity.UserEntity;
import com.eemgu.usedproducts.domain.jpa.service.UserEntityService;
import com.eemgu.usedproducts.domain.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileServiceImplement implements FileService {
    @Value("${file.path}")
    private String filePath;
    @Value("${file.url}")
    private String fileUrl;
    private final UserEntityService userEntityService;
    @Override
    public String upload(MultipartFile file, String email) {
        if(file.isEmpty()) return null;
        String originFileName = file.getOriginalFilename();
        String extension = Objects.requireNonNull(originFileName).substring(originFileName.lastIndexOf(".")); // 확장자
        String uuid = UUID.randomUUID().toString(); // 랜덤 이름
        String saveFileName = uuid + extension;
        String savePath = filePath + saveFileName;
        try{
            Optional<UserEntity> optionalUser = userEntityService.findByEmail(email);
            if(optionalUser.isEmpty()) return null;

            file.transferTo(new File(savePath));
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
        return fileUrl + saveFileName;
    }
}
