package com.eemgu.usedproducts.web.controller;

import com.eemgu.usedproducts.domain.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    @Value("${file.path}")
    private String filePath;
    @Value("${file.url}")
    private String fileUrl;

    @PostMapping("/upload")
    public String upload(
            @RequestParam("file")MultipartFile file){
        return fileService.upload(file);
    }

    @GetMapping(value = "/used/{fileName}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public Resource getImage(@PathVariable("fileName") String fileName){
        return fileService.getImage(fileName);
    }


}
