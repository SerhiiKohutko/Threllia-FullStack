package org.example.threllia.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.threllia.model.Release.entities.MusicRelease;
import org.example.threllia.model.Release.enums.SortingType;
import org.example.threllia.model.Release.service.ReleaseService;
import org.example.threllia.requests.ReleaseRequest;
import org.example.threllia.responses.DeletionResponse;
import org.example.threllia.utils.FileUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/releases")
public class ReleaseController {
    @Autowired
    private ReleaseService releaseService;
    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<Page<MusicRelease>> getAllReleases(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "DSC") SortingType type){
        Page<MusicRelease> musicReleases = releaseService.getAllReleases(page, type);
        return ResponseEntity.ok(musicReleases);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MusicRelease> getReleaseById(@PathVariable long id) throws Exception {
        MusicRelease release = releaseService.getReleaseById(id);
        return ResponseEntity.ok(release);
    }

    //ADMIN FUNCTIONALITY
    @PostMapping(path = "/admin", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MusicRelease> addRelease(@RequestParam("data") String  data, @RequestParam("releaseCover") MultipartFile image) throws Exception {
        String imageName = FileUploader.uploadReleaseCover(image);

        ReleaseRequest release = objectMapper.readValue(data, ReleaseRequest.class);

        MusicRelease savedMusicRelease = releaseService.addRelease(release, imageName);
        return new ResponseEntity<>(savedMusicRelease, HttpStatus.CREATED);
    }

    @PatchMapping(path = "/admin/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MusicRelease> updateRelease(@PathVariable long id, @RequestPart("data") String  data, @RequestPart(value = "releaseCover", required = false) MultipartFile image) throws Exception {

        String imageName = FileUploader.uploadReleaseCover(image);

        ReleaseRequest release = objectMapper.readValue(data, ReleaseRequest.class);

        MusicRelease savedMusicRelease = releaseService.updateMusicRelease(id, release, imageName);
        return new ResponseEntity<>(savedMusicRelease, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<DeletionResponse> deleteRelease(@PathVariable long id){
        releaseService.deleteReleaseById(id);
        return ResponseEntity.ok(new DeletionResponse("Release deleted successfully!"));
    }



}
