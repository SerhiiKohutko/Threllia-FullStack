package org.example.threllia.controllers;

import org.example.threllia.model.Gallery.entities.PhotoCollection;
import org.example.threllia.model.Gallery.service.PhotoService;
import org.example.threllia.model.Release.enums.SortingType;
import org.example.threllia.requests.PhotoCollectionCreationRequest;
import org.example.threllia.utils.FileUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

//TODO - make DTO for GalleryItem, no need to transfer all photos that collection has until user selects the certain collection

@RestController
@RequestMapping("/api/photos")
public class GalleryController {

    @Autowired
    private PhotoService photoService;

    @GetMapping
    public ResponseEntity<List<PhotoCollection>> getAllPhotos(){
        List<PhotoCollection> photoCollections = photoService.getPhotos();
        return new ResponseEntity<>(photoCollections, HttpStatus.OK);
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<PhotoCollection>> getAllPhotosPaginated(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "DSC") SortingType order){
        Page<PhotoCollection> galleryItems = photoService.getAllPhotosPaginated(page, order);
        return ResponseEntity.ok(galleryItems);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhotoCollection> getPhotoById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(photoService.getById(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PhotoCollection> createPhoto(@RequestPart("data") PhotoCollectionCreationRequest request, @RequestPart("photos") List<MultipartFile> photos) throws Exception {
        List<String> fileNames = FileUploader.saveAllPhotos(photos);
        PhotoCollection savedPhotoCollection = photoService.createGalleryItem(request, fileNames);
        return new ResponseEntity<>(savedPhotoCollection, HttpStatus.CREATED);
    }
    @PatchMapping("/{id}")
    public ResponseEntity<PhotoCollection> addPhotosToGalleryItem(@PathVariable long id, @RequestParam String authorName, @RequestPart("photos") List<MultipartFile> photos) throws Exception {
        List<String> fileNames = FileUploader.saveAllPhotos(photos);
        PhotoCollection updatedPhotoCollection = photoService.addPhotos(fileNames, authorName, id);
        return new ResponseEntity<>(updatedPhotoCollection, HttpStatus.OK);
    }

}
