package org.example.threllia.model.Song.service;

import org.example.threllia.dto.SongDTO;
import org.example.threllia.dto.SongsOrderedDTO;
import org.example.threllia.model.Song.entities.Song;
import org.example.threllia.requests.SongCreationRequest;

import java.util.List;

public interface SongService {

    SongsOrderedDTO getAllSongsAlphabeticallyOrdered();
    SongDTO getSongById(long id) throws Exception;
    Song addSong(SongCreationRequest request);
    Song getSongByTitle(String title) throws Exception;
    void deleteAllSongs();
    List<Song> findAllSongs();


    //ADMIN FUNCTIONALITY
    Song updateSong(long id, SongCreationRequest songCreationRequest) throws Exception;
    void deleteSong(long id);
}
