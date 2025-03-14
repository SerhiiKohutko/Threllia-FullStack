package org.example.threllia.utils;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileUploader {
    private static final String UPLOAD_DIR_NEWS = "E:\\JavaProjects\\threllia\\backend\\src\\main\\resources\\static\\news";

    public static String uploadLatestUpdateImage(MultipartFile image) throws Exception {
        if (image.isEmpty()) {
            throw new Exception("File is empty");
        }

        Path uploadPath = Paths.get(UPLOAD_DIR_NEWS);

        if (!Files.exists(uploadPath)){
            Files.createDirectory(uploadPath);
        }

        String fileName = image.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        image.transferTo(filePath.toFile());

        return fileName;
    }
}
