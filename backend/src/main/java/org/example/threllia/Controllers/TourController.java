package org.example.threllia.Controllers;

import org.example.threllia.Modal.Concert;
import org.example.threllia.Servicies.ConcertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/concerts")
public class TourController {

    @Autowired
    private ConcertService concertService;

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

}
