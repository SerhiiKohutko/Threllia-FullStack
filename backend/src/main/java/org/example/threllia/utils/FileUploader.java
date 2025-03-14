package org.example.threllia.utils;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileUploader {
    private static final String UPLOAD_DIR_NEWS = "E:\\JavaProjects\\threllia\\backend\\src\\main\\resources\\static\\news";
    private static final String UPLOAD_DIR_PHOTOS = "E:\\JavaProjects\\threllia\\backend\\src\\main\\resources\\static\\photos";

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

    public static List<String> saveAllPhotos(List<MultipartFile> photos) throws Exception {
        Path uploadPath = Paths.get(UPLOAD_DIR_PHOTOS);
        List<String> fileNames = new ArrayList<>();

        if (!Files.exists(uploadPath)){
            Files.createDirectory(uploadPath);
        }

        try {
            for (MultipartFile file : photos) {
                String fileName = file.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);
                file.transferTo(filePath.toFile());
                fileNames.add(fileName);
            }
        } catch (IOException exception){
            throw new Exception("Files saving error");
        }
        return fileNames;
    }
}
