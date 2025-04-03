package org.example.threllia.model.Concert.services;

import org.example.threllia.model.Concert.dto.ConcertDTO;
import org.example.threllia.model.Concert.entities.Concert;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ConcertService {

    Concert getConcertById(long id) throws Exception;
    Concert addShow(ConcertDTO concert) throws Exception;
    List<Concert> getAllActiveConcerts();
    Page<Concert> getAllInActiveConcerts(int page);
    List<Concert> getClosestSixConcerts();
    Page<Concert> getConcertBySong(String songTitle, int page) throws Exception;

    Concert updateConcertById(long id, ConcertDTO concert) throws Exception;

    void deleteConcertById(long id);
}
