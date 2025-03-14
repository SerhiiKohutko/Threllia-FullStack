package org.example.threllia.model.Concert.services;

import org.example.threllia.model.Concert.entities.Concert;

import java.util.List;

public interface ConcertService {

    List<Concert> addShows(List<Concert> concerts);
    Concert addShow(Concert concert);
    List<Concert> getAllActiveConcerts();
    List<Concert> getAllInActiveConcerts();
    List<Concert> getClosestSixConcerts();
}
