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
    public List<Concert> addShows(List<Concert> concerts) {
        return concertRepository.saveAll(concerts);
    }

    @Override
    public Concert addShow(Concert concert) {
        Concert newConcert = new Concert();

        newConcert.setCity(concert.getCity());
        newConcert.setDate(concert.getDate());
        newConcert.setStatus(ConcertStatus.ACTIVE);
        newConcert.setPlace(concert.getPlace());
        newConcert.setCountry(concert.getCountry());

        return concertRepository.save(newConcert);
    }

    @Override
    public List<Concert> getAllActiveConcerts() {
        return concertRepository.getTourItemsByStatus(ConcertStatus.ACTIVE);
    }

    @Override
    public List<Concert> getAllInActiveConcerts() {
        return concertRepository.getTourItemsByStatus(ConcertStatus.INACTIVE);
    }

    @Override
    public List<Concert> getClosestSixConcerts() {
        return concertRepository.getConcertByStatusOrderByDate(null);
    }

}
