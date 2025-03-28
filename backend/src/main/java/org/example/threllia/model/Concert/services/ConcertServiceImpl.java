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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Deprecated
    @Override
    public List<Concert> addShows(List<Concert> concerts) throws Exception {
        List<Concert> savedConcerts = new ArrayList<>();

        for (Concert curr : concerts)
            savedConcerts.add(addShow(null));

        return savedConcerts;
    }

    @Override
    public Concert updateSongsList(long id, Set<String> songsList) throws Exception {
        Concert concert  = getConcertById(id);

        if (concert.getStatus().equals(ConcertStatus.ACTIVE)){
            throw new Exception("Concert has ACTIVE status, songs cannot be added");
        }

        Set<Song> readyToUpdateList = getReadyToUpdateSongsSet(songsList);
        concert.getSongsList().addAll(readyToUpdateList);

        return concertRepository.save(concert);
    }

    private Set<Song> getReadyToUpdateSongsSet(Set<String> songsList) throws Exception {
        Set<Song> readyToUpdateList = new HashSet<>();
        for (String title : songsList) {
            readyToUpdateList.add(songService.getSongByTitle(title));
        }
        return readyToUpdateList;
    }

}
