package org.example.threllia.model.Concert.services;

import org.example.threllia.model.Concert.entities.Concert;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Set;

public interface ConcertService {

    Concert getConcertById(long id) throws Exception;
    List<Concert> addShows(List<Concert> concerts);
    Concert addShow(Concert concert);
    List<Concert> getAllActiveConcerts();
    Page<Concert> getAllInActiveConcerts(int page);
    List<Concert> getClosestSixConcerts();
    Page<Concert> getConcertBySong(String songTitle, int page) throws Exception;
    Concert updateSongsList(long id, Set<String> songsList) throws Exception;
}
