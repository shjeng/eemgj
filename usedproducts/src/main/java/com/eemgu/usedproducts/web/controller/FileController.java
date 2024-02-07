package com.eemgu.usedproducts.web.controller;

import com.eemgu.usedproducts.domain.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;
    @PostMapping("/upload")
    public String upload(
            @RequestParam("file")MultipartFile file, @AuthenticationPrincipal String email){
        return fileService.upload(file, email);
    }
}
