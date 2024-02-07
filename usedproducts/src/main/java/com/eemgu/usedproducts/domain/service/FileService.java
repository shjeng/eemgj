package com.eemgu.usedproducts.domain.service;


import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String upload(MultipartFile file, String email);
}
