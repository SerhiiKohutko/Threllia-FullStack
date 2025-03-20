package org.example.threllia.controllers;

import org.example.threllia.model.Release.entities.MusicRelease;
import org.example.threllia.model.Release.service.ReleaseService;
import org.example.threllia.model.Song.entities.Song;
import org.example.threllia.requests.ReleaseRequest;
import org.example.threllia.utils.FileUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@RestController
@RequestMapping("/api/releases")
public class ReleaseController {
    @Autowired
    private ReleaseService releaseService;

    @GetMapping
    public ResponseEntity<Page<MusicRelease>> getAllReleases(@RequestParam(defaultValue = "0") int page){
        Page<MusicRelease> musicReleases = releaseService.getAllReleases(page);
        return ResponseEntity.ok(musicReleases);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MusicRelease> addRelease(@RequestPart("release") ReleaseRequest release, @RequestPart("releaseCover") MultipartFile image) throws Exception {
        String imageName = FileUploader.uploadReleaseCover(image);
        MusicRelease savedMusicRelease = releaseService.addRelease(release, imageName);
        return new ResponseEntity<>(savedMusicRelease, HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity<MusicRelease> updateTrackList(@RequestBody Set<Song> trackList, @RequestParam long releaseId){
        MusicRelease updatedMusicRelease = releaseService.updateReleaseTrackList(trackList, releaseId);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
