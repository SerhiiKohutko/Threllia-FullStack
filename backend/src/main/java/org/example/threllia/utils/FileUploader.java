package org.example.threllia.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class FileUploader {
    private static final String UPLOAD_DIR_NEWS = "E:\\JavaProjects\\threllia\\backend\\src\\main\\resources\\static\\news";
    private static final String UPLOAD_DIR_PHOTOS = "E:\\JavaProjects\\threllia\\backend\\src\\main\\resources\\static\\photos";
    private static final String UPLOAD_DIR_RELEASES = "E:\\JavaProjects\\threllia\\backend\\src\\main\\resources\\static\\releases";
    private static final String UPLOAD_DIR_PRODUCTS = "E:\\JavaProjects\\threllia\\backend\\src\\main\\resources\\static\\shop";

    public static String uploadLatestUpdateImage(MultipartFile image) throws Exception {
        if (image == null) {
            return null;
        }

        return getString(image, UPLOAD_DIR_NEWS);
    }
    public static String uploadReleaseCover(MultipartFile image) throws Exception {
        if (image == null){
            return null;
        }

        return getString(image, UPLOAD_DIR_RELEASES);
    }
    public static String uploadProductImage(MultipartFile image) throws Exception {
        if (image == null) {
            return null;
        }
        return getString(image, UPLOAD_DIR_PRODUCTS);
    }

    public static void removePhotoImage(String fileName) throws IOException {
        if (fileName == null){
            return;
        }

        Path deletionPath = Paths.get(UPLOAD_DIR_PHOTOS + "\\" + fileName);
        Files.delete(deletionPath);

    }

    public static void removeLatestUpdateImage(String fileName) throws IOException {
        if (fileName == null){
            return;
        }

        Path deletionPath = Paths.get(UPLOAD_DIR_NEWS + "\\" + fileName);
        Files.delete(deletionPath);

    }

    public static void removeProductImage(String fileName) throws IOException {
        if (fileName == null){
            return;
        }

        Path deletionPath = Paths.get(UPLOAD_DIR_PRODUCTS + "\\" + fileName);
        Files.delete(deletionPath);

    }


    public static void deleteReplacedCover(String fileName) throws Exception{
        if (fileName == null){
            return;
        }

        Path deletionPath = Paths.get(UPLOAD_DIR_RELEASES + "\\" + fileName);
        Files.delete(deletionPath);

    }

    private static String getString(MultipartFile image, String folder) throws Exception {
        if (image.isEmpty()) {
            throw new Exception("File is empty");
        }

        Path uploadPath = Paths.get(folder);

        if (!Files.exists(uploadPath)){
            Files.createDirectory(uploadPath);
        }

        String fileName = getCorrectFileName(Objects.requireNonNull(image.getOriginalFilename()));

        Path filePath = uploadPath.resolve(fileName);
        image.transferTo(filePath.toFile());

        return fileName;
    }

    public static List<String> saveAllPhotos(List<MultipartFile> photos) throws Exception {

        if (photos == null){
            return null;
        }

        Path uploadPath = Paths.get(UPLOAD_DIR_PHOTOS);
        List<String> fileNames = new ArrayList<>();

        if (!Files.exists(uploadPath)){
            Files.createDirectory(uploadPath);
        }

        try {
            for (MultipartFile file : photos) {
                String fileName = getCorrectFileName(Objects.requireNonNull(file.getOriginalFilename()));
                Path filePath = uploadPath.resolve(fileName);
                file.transferTo(filePath.toFile());
                fileNames.add(fileName);
            }
        } catch (IOException exception){
            throw new Exception("Files saving error");
        }
        return fileNames;
    }

    private static String getCorrectFileName(String origin){
        return origin.replace("C:\\fakepath\\", "");
    }
}
