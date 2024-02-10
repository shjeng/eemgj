package com.eemgu.usedproducts.web.controller;

import com.eemgu.usedproducts.domain.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping(value = "{fileName}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public Resource getImage(@PathVariable("fileName") String fileName){
//        Resource resource = fileService.getImage(fileName);
//        return resource;
        return null;
    }
}
