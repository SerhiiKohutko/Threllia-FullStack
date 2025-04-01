package org.example.threllia.controllers;

import org.example.threllia.model.Concert.dto.ConcertDTO;
import org.example.threllia.model.Concert.entities.Concert;
import org.example.threllia.model.Concert.services.ConcertService;
import org.example.threllia.responses.DeletionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

//TODO - change concertDTO from set to list to keep the order

@RestController
@RequestMapping("api/concerts")
public class ConcertController {

    @Autowired
    private ConcertService concertService;

    @GetMapping("/active")
    public ResponseEntity<List<Concert>> getActiveConcerts(){
        List<Concert> activeConcerts = concertService.getAllActiveConcerts();
        return new ResponseEntity<>(activeConcerts, HttpStatus.OK);
    }

    @GetMapping("/inactive")
    public ResponseEntity<Page<Concert>> getInactiveConcerts(@RequestParam(defaultValue = "0") int page){
        Page<Concert> activeConcerts = concertService.getAllInActiveConcerts(page);
        return new ResponseEntity<>(activeConcerts, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Concert> getConcertById(@PathVariable long id) throws Exception {
        Concert concert = concertService.getConcertById(id);
        return ResponseEntity.ok(concert);
    }

    @GetMapping
    public ResponseEntity<Page<Concert>> getConcertsBySongContained(@RequestParam String songTitle, @RequestParam(defaultValue = "0") int page) throws Exception {
        Page<Concert> concerts = concertService.getConcertBySong(songTitle, page);
        return ResponseEntity.ok(concerts);
    }

    @GetMapping("/closest")
    public ResponseEntity<List<Concert>> getClosestConcerts(){
        List<Concert> closestSix = concertService.getClosestSixConcerts();
        return new ResponseEntity<>(closestSix, HttpStatus.OK);
    }

    @Deprecated
    @PatchMapping("/{id}/updateSongsList")
    public ResponseEntity<Concert> updateSongList(@PathVariable long id,
                                                  @RequestBody Set<String> updatedSongsList) throws Exception {

        Concert updatedConcert = concertService.updateSongsList(id, updatedSongsList);

        return ResponseEntity.ok(updatedConcert);
    }

    //ADMIN FUNCTIONALITY

    @PostMapping
    public ResponseEntity<Concert> addShow(@RequestBody ConcertDTO concert) throws Exception {
        Concert savedConcert = concertService.addShow(concert);
        return new ResponseEntity<>(savedConcert, HttpStatus.CREATED);
    }
    @PatchMapping("/admin/{id}")
    public ResponseEntity<Concert> updateConcertById(@PathVariable long id, @RequestBody ConcertDTO concert) throws Exception {
        return ResponseEntity.ok(concertService.updateConcertById(id, concert));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<DeletionResponse> deleteShow(@PathVariable long id){
        concertService.deleteConcertById(id);
        return ResponseEntity.ok(new DeletionResponse("Show deleted successfully!"));
    }
}
