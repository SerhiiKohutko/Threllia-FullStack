package org.example.threllia.model.Song.service;

import org.example.threllia.model.Song.entities.Song;

import java.util.List;

public interface SongService {
    Song getSongById(long id) throws Exception;
    Song addSong(Song song);
    Song getSongByTitle(String title) throws Exception;
    void deleteAllSongs();
    List<Song> findAllSongs();
}
