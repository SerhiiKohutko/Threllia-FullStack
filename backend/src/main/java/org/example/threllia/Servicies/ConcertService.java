package org.example.threllia.Servicies;

import org.example.threllia.Modal.Concert;

import java.util.List;

public interface ConcertService {

    List<Concert> getAllActiveConcerts();
    List<Concert> getAllInActiveConcerts();
}
