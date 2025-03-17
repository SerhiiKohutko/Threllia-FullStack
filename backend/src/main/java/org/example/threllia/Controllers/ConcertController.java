package org.example.threllia.controllers;

import org.example.threllia.model.Concert.entities.Concert;
import org.example.threllia.model.Concert.services.ConcertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/concerts")
public class ConcertController {

    @Autowired
    private ConcertService concertService;

    @PostMapping
    public ResponseEntity<Concert> addShow(@RequestBody Concert concert){
        Concert savedConcert = concertService.addShow(concert);
        return new ResponseEntity<>(savedConcert, HttpStatus.CREATED);
    }

    @PostMapping("/addShows")
    public ResponseEntity<List<Concert>> addShows(@RequestBody List<Concert> concerts){
        List<Concert> concertList = concertService.addShows(concerts);
        return new ResponseEntity<>(concertList, HttpStatus.CREATED);
    }


    @GetMapping("/active")
    public ResponseEntity<List<Concert>> getActiveConcerts(){
        List<Concert> activeConcerts = concertService.getAllActiveConcerts();
        return new ResponseEntity<>(activeConcerts, HttpStatus.OK);
    }

    @GetMapping("/inactive")
    public ResponseEntity<List<Concert>> getInactiveConcertsByStatus(){
        List<Concert> activeConcerts = concertService.getAllInActiveConcerts();
        return new ResponseEntity<>(activeConcerts, HttpStatus.OK);
    }

    @GetMapping("/closest")
    public ResponseEntity<List<Concert>> getClosestConcerts(){
        List<Concert> closestSix = concertService.getClosestSixConcerts();
        return new ResponseEntity<>(closestSix, HttpStatus.OK);
    }

    @PatchMapping("/{id}/updateSongsList")
    public ResponseEntity<Concert> updateSongList(@PathVariable long id,
                                                  @RequestBody Set<String> updatedSongsList) throws Exception {

        Concert updatedConcert = concertService.updateSongsList(id, updatedSongsList);

        return ResponseEntity.ok(updatedConcert);
    }


}
