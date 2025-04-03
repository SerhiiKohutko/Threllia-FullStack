package org.example.threllia.model.Concert.services;

import org.example.threllia.model.Concert.concert_enum.ConcertStatus;
import org.example.threllia.model.Concert.dto.ConcertDTO;
import org.example.threllia.model.Concert.entities.Concert;
import org.example.threllia.model.Concert.repositories.ConcertRepository;
import org.example.threllia.model.Song.entities.Song;
import org.example.threllia.model.Song.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ConcertServiceImpl implements ConcertService{
    @Autowired
    private ConcertRepository concertRepository;

    @Autowired
    private SongService songService;

    @Override
    public Concert getConcertById(long id) throws Exception {
        return concertRepository.getConcertById(id).orElseThrow(() -> new Exception("No such concert found with id = " + id));
    }

    @Override
    public List<Concert> getAllActiveConcerts() {
        return concertRepository.getTourItemsByStatus(ConcertStatus.ACTIVE);
    }

    @Override
    public Page<Concert> getAllInActiveConcerts(int page) {
        PageRequest pageRequest = PageRequest.of(page, 5, Sort.by("date").descending());
        return concertRepository.findByStatus(ConcertStatus.INACTIVE, pageRequest);
    }

    @Override
    public List<Concert> getClosestSixConcerts() {
        return concertRepository.getActiveConcertsOrderByDate(ConcertStatus.ACTIVE);
    }

    @Override
    public Page<Concert> getConcertBySong(String songTitle, int page) throws Exception {
        Song song = songService.getSongByTitle(songTitle);
        PageRequest pageRequest = PageRequest.of(page, 5);
        return concertRepository.getConcertBySongsListContainingId(song.getId(), pageRequest);
    }


    //ADMIN FUNCTIONALITY
    @Override
    public Concert addShow(ConcertDTO concert) throws Exception {
        Concert newConcert = new Concert();

        newConcert.setCity(concert.getCity());
        newConcert.setDate(concert.getDate());

        // if current date is after the received concert date
        // > the concert is not active anymore
        if (LocalDate.now().isAfter(concert.getDate())) {
            newConcert.setStatus(ConcertStatus.INACTIVE);
            newConcert.setSongsList(getReadyToUpdateSongsSet(concert.getSongsList()));
        } else {
            newConcert.setStatus(ConcertStatus.ACTIVE);
        }

        newConcert.setRelatedTour(concert.getRelatedTour());
        newConcert.setPlace(concert.getPlace());
        newConcert.setCountry(concert.getCountry());

        return concertRepository.save(newConcert);
    }

    @Override
    public Concert updateConcertById(long id, ConcertDTO concert) throws Exception {
        Concert updatedConcert = getConcertById(id);

        updatedConcert.setDate(concert.getDate());
        updatedConcert.setCity(concert.getCity());
        updatedConcert.setPlace(concert.getPlace());
        updatedConcert.setCountry(concert.getCountry());

        updatedConcert.setSongsList(getReadyToUpdateSongsSet(concert.getSongsList()));

        updatedConcert.setRelatedTour(concert.getRelatedTour());

        return concertRepository.save(updatedConcert);
    }

    @Override
    public void deleteConcertById(long id) {
        concertRepository.deleteById(id);
    }

    private List<Song> getReadyToUpdateSongsSet(List<String> songsList) throws Exception {
        List<Song> readyToUpdateList = new ArrayList<>();
        for (String title : songsList) {
            readyToUpdateList.add(songService.getSongByTitle(title));
        }
        return readyToUpdateList;
    }

}
