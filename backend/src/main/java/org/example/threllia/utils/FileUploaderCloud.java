package org.example.threllia.utils;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.annotation.PostConstruct;
import org.example.threllia.model.Gallery.entities.Photo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FileUploaderCloud {
    @Value("${cloudinary.cloud-name}")
    private String cloudName;

    @Value("${cloudinary.api-key}")
    private String apiKey;

    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    private  Cloudinary cloudinary;

    @PostConstruct
    public void init() {
        if (cloudName == null || apiKey == null || apiSecret == null) {
            throw new IllegalArgumentException("Cloudinary configuration is missing");
        }

        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }

    public String uploadImage(MultipartFile image) throws Exception {
        if (image.isEmpty()) {
            throw new IOException("File is empty");
        }
        Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
        return uploadResult.get("url").toString();
    }

    public void deleteFile(String fileUrl) throws IOException {
        if (fileUrl == null || fileUrl.isEmpty()) {
            throw new IOException("Invalid file URL");
        }
        Map result = cloudinary.uploader().destroy(fileUrl, ObjectUtils.emptyMap());
    }

    public List<String> uploadFiles(List<MultipartFile> files) throws Exception {
        if (files == null || files.isEmpty()) {
            throw new IOException("No files provided");
        }

        List<String> urls = new ArrayList<>();
        for (MultipartFile file : files) {
            urls.add(uploadImage(file));
        }
        return urls;
    }

    public List<Photo> deleteFiles(List<Photo> photos) throws IOException {
        if (photos == null) {
            throw new IOException("No file URLs provided");
        }

        return photos.stream()
                .filter(photo -> {
                    try {
                        deleteFile(photo.getImageName());
                    } catch (IOException e) {
                        return false;
                    }
                    return true;
                })
                .collect(Collectors.toList());
    }
}
