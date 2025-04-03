package org.example.threllia.controllers;

import org.example.threllia.dto.SongDTO;
import org.example.threllia.dto.SongsOrderedDTO;
import org.example.threllia.model.Song.entities.Song;
import org.example.threllia.model.Song.service.SongService;
import org.example.threllia.requests.SongCreationRequest;
import org.example.threllia.responses.DeletionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/songs")
public class SongController {

    @Autowired
    private SongService songService;

    @GetMapping
    public ResponseEntity<List<Song>> getAllSongs(){
        return ResponseEntity.ok(songService.findAllSongs());
    }

    @GetMapping("/ordered")
    public ResponseEntity<SongsOrderedDTO> getAllSongsAlphabeticallyOrdered(){
        return ResponseEntity.ok(songService.getAllSongsAlphabeticallyOrdered());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SongDTO> getSongById(@PathVariable long id) throws Exception {
        return ResponseEntity.ok(songService.getSongById(id));
    }


    //ADMIN FUNCTIONALITY

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<DeletionResponse> deleteSong(@PathVariable long id){
        songService.deleteSong(id);
        return ResponseEntity.ok(new DeletionResponse("Deleted successfully!"));
    }

    @PatchMapping("/admin/{id}")
    public ResponseEntity<Song> updateSong(@RequestBody SongCreationRequest request, @PathVariable long id) throws Exception {
        return ResponseEntity.ok(songService.updateSong(id, request));
    }

    @PostMapping("/admin")
    public ResponseEntity<Song> addSong(@RequestBody SongCreationRequest request){
        Song savedSong = songService.addSong(request);
        return ResponseEntity.ok(savedSong);
    }
}
