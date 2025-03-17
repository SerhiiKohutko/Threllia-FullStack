package org.example.threllia.model.Concert.services;

import org.example.threllia.model.Concert.entities.Concert;

import java.util.List;
import java.util.Set;

public interface ConcertService {

    Concert getConcertById(long id) throws Exception;
    List<Concert> addShows(List<Concert> concerts);
    Concert addShow(Concert concert);
    List<Concert> getAllActiveConcerts();
    List<Concert> getAllInActiveConcerts();
    List<Concert> getClosestSixConcerts();
    Concert updateSongsList(long id, Set<String> songsList) throws Exception;
}
