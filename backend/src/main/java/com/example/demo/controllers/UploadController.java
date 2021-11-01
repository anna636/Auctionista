package com.example.demo.controllers;

import com.example.demo.services.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UploadController {

    @Autowired
    private UploadService uploadService;


    @PostMapping("/api/upload")
    public ResponseEntity<List<String>> uploads (@RequestParam List<MultipartFile> files){

        List<String> uploadUrls = uploadService.saveFiles(files);
        if(uploadUrls != null) {
            return ResponseEntity.ok(uploadUrls);
        }
        else{
            return ResponseEntity.badRequest().build();
        }

    }
}
