package org.example.threllia.Servicies;

import org.example.threllia.Enums.ConcertStatus;
import org.example.threllia.Modal.Concert;
import org.example.threllia.Repositories.ConcertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConcertServiceImpl implements ConcertService{
    @Autowired
    private ConcertRepository concertRepository;

    @Override
    public List<Concert> getAllActiveConcerts() {
        return concertRepository.getTourItemsByStatus(ConcertStatus.ACTIVE);
    }

    @Override
    public List<Concert> getAllInActiveConcerts() {
        return concertRepository.getTourItemsByStatus(ConcertStatus.INACTIVE);
    }
}
