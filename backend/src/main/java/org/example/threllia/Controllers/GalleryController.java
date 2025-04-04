package org.example.threllia.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.threllia.dto.PhotoCollectionDTO;
import org.example.threllia.model.Gallery.entities.PhotoCollection;
import org.example.threllia.model.Gallery.service.PhotoService;
import org.example.threllia.model.Release.enums.SortingType;
import org.example.threllia.requests.PhotoCollectionCreationRequest;
import org.example.threllia.responses.DeletionResponse;
import org.example.threllia.utils.FileUploaderCloud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private FileUploaderCloud fileUploaderCloud;

    @GetMapping
    public ResponseEntity<List<PhotoCollection>> getAllPhotos(){
        List<PhotoCollection> photoCollections = photoService.getPhotos();
        return new ResponseEntity<>(photoCollections, HttpStatus.OK);
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<PhotoCollectionDTO>> getAllPhotosPaginated(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "DSC") SortingType order){
        Page<PhotoCollectionDTO> galleryItems = photoService.getAllPhotosPaginated(page, order);
        return ResponseEntity.ok(galleryItems);
    }


    @GetMapping("/{id}")
    public ResponseEntity<PhotoCollection> getPhotoById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(photoService.getById(id));
    }

    //ADMIN FUNCTIONALITY

    @PostMapping(path = "/admin", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PhotoCollection> createPhotoCollection(@RequestParam("data") String data, @RequestParam("photos") List<MultipartFile> photos) throws Exception {

        PhotoCollectionCreationRequest request = objectMapper.readValue(data, PhotoCollectionCreationRequest.class);

        List<String> fileNames = fileUploaderCloud.uploadFiles(photos);
        PhotoCollection savedPhotoCollection = photoService.createGalleryItem(request, fileNames);
        return new ResponseEntity<>(savedPhotoCollection, HttpStatus.CREATED);
    }

    @PatchMapping(path = "/admin/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PhotoCollection> updatePhotoCollection(@PathVariable long id, @RequestParam("data") String data, @RequestParam(value = "photos", required = false) List<MultipartFile> photos) throws Exception {

        PhotoCollectionCreationRequest request = objectMapper.readValue(data, PhotoCollectionCreationRequest.class);

        List<String> fileNames = fileUploaderCloud.uploadFiles(photos);

        PhotoCollection savedPhotoCollection = photoService.updatePhotoCollection(id, request, fileNames);
        return new ResponseEntity<>(savedPhotoCollection, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<DeletionResponse> deletePhotoCollectionById(@PathVariable long id) throws Exception {
        photoService.deletePhotoCollectionById(id);
        return ResponseEntity.ok(new DeletionResponse("Deleted successfully!"));
    }

}
