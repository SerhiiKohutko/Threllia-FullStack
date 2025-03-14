package org.example.threllia.Controllers;

import org.example.threllia.Modal.Gallery.GalleryItem;
import org.example.threllia.Servicies.PhotoService;
import org.example.threllia.requests.GalleryItemCreationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<GalleryItem> createPhoto(@RequestPart("data") GalleryItemCreationRequest request){
        return null;
    }
}
