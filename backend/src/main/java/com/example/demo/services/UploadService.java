package com.example.demo.services;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class UploadService {

    public List<String> saveFiles(List<MultipartFile> files) {
        List<String> uploadUrls=new ArrayList<>();

        String cwd=System.getProperty("user.dir");
        System.out.println(cwd);

        String uploadFolder=cwd+ "/src/main/resources/static";


        for(var file:files){
            System.out.println(file.getOriginalFilename());

            var uploadUrl="/uploads/"+ file.getOriginalFilename();
            File toSave=new File(uploadFolder+uploadUrl);

            try{
                file.transferTo(toSave);
                uploadUrls.add(uploadUrl);
            }
            catch(Exception e){
                e.printStackTrace();
            }

        }
        return uploadUrls;
    }
}
