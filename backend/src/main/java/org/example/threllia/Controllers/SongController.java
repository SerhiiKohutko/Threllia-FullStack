package org.example.threllia.controllers;

import org.example.threllia.model.Song.entities.Song;
import org.example.threllia.model.Song.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/songs")
public class SongController {

    @Autowired
    private SongService songService;

    @PostMapping
    public ResponseEntity<Song> addSong(@RequestBody Song song){
        Song savedSong = songService.addSong(song);
        return ResponseEntity.ok(savedSong);
    }

    @GetMapping
    public ResponseEntity<List<Song>> getAllSongs(){
        return ResponseEntity.ok(songService.findAllSongs());
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllSongs(){
        songService.deleteAllSongs();
        return ResponseEntity.ok("All Song Deleted");
    }

}
