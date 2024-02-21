package com.eemgu.usedproducts.domain.service.implement;

import com.eemgu.usedproducts.domain.entity.UserEntity;
import com.eemgu.usedproducts.domain.jpa.service.UserEntityService;
import com.eemgu.usedproducts.domain.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
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
    public String upload(MultipartFile file) {
        if(file.isEmpty()) return null;
        String originFileName = file.getOriginalFilename();
        String extension = Objects.requireNonNull(originFileName).substring(originFileName.lastIndexOf(".")); // 확장자
        String uuid = UUID.randomUUID().toString(); // 랜덤 이름
        String saveFileName = uuid + extension;
        String savePath = filePath + saveFileName;
        try{

            file.transferTo(new File(savePath));
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
        return fileUrl + saveFileName;
    }

    @Override
    public Resource getImage(String fileName) {
        Resource resource;
        try{
            resource = new UrlResource("file:" + filePath + fileName);
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
        return resource;
    }
}
