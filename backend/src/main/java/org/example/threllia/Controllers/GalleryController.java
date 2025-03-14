package org.example.threllia.controllers;

import org.example.threllia.model.Gallery.entities.GalleryItem;
import org.example.threllia.model.Gallery.service.PhotoService;
import org.example.threllia.requests.GalleryItemCreationRequest;
import org.example.threllia.utils.FileUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/photos")
public class GalleryController {

    @Autowired
    private PhotoService photoService;

    @GetMapping
    public ResponseEntity<List<GalleryItem>> getAllPhotos(){
        List<GalleryItem> galleryItems = photoService.getPhotos();
        return new ResponseEntity<>(galleryItems, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GalleryItem> getPhotoById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(photoService.getById(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<GalleryItem> createPhoto(@RequestPart("data") GalleryItemCreationRequest request, @RequestPart("photos") List<MultipartFile> photos) throws Exception {
        List<String> fileNames = FileUploader.saveAllPhotos(photos);
        GalleryItem savedGalleryItem = photoService.createGalleryItem(request, fileNames);
        return new ResponseEntity<>(savedGalleryItem, HttpStatus.CREATED);
    }
    @PatchMapping("/{id}")
    public ResponseEntity<GalleryItem> addPhotosToGalleryItem(@PathVariable long id, @RequestParam String authorName, @RequestPart("photos") List<MultipartFile> photos) throws Exception {
        List<String> fileNames = FileUploader.saveAllPhotos(photos);
        GalleryItem updatedGalleryItem = photoService.addPhotos(fileNames, authorName, id);
        return new ResponseEntity<>(updatedGalleryItem, HttpStatus.OK);
    }

}
