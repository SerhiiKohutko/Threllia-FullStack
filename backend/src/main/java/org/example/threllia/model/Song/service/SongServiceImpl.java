package org.example.threllia.model.Song.service;

import org.example.threllia.model.Concert.entities.Concert;
import org.example.threllia.model.Concert.repositories.ConcertRepository;
import org.example.threllia.model.Song.entities.Song;
import org.example.threllia.model.Song.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SongServiceImpl implements SongService{
    @Autowired
    private SongRepository songRepository;
    @Autowired
    private ConcertRepository concertRepository;

    @Override
    public Song getSongById(long id) throws Exception {
        return songRepository.findSongById(id).orElseThrow(() -> new Exception("No such song found with id = " + id));
    }

    @Override
    public Song getSongByTitle(String title) throws Exception {
        return songRepository.getSongByTitle(title).orElseThrow(() -> new Exception("No song with title " + title + " exists"));
    }
    @Override
    public List<Song> findAllSongs() {
        return songRepository.findAll();
    }


    //ADMIN FUNCTIONALITY
    @Override
    public Song addSong(Song song) {

        if (songRepository.existsByTitle(song.getTitle())) {
            throw new IllegalArgumentException("Song exists with such title!");
        }

        Song savedSong = new Song();

        savedSong.setAlbum(song.getAlbum());
        savedSong.setTitle(song.getTitle());
        savedSong.setLyrics(song.getLyrics());

        return songRepository.save(song);
    }


    //ADMIN FUNCTIONALITY
    @Override
    public void deleteAllSongs() {
        List<Song> songList = songRepository.findAll();
        List<Concert> concertToUpdate = new ArrayList<>();

        for (Song song : songList) {
            song.getConcertPlayed().forEach(e -> {
                e.getSongsList().remove(song);
                concertToUpdate.add(e);
            });
        }

        concertRepository.saveAll(concertToUpdate);

        songRepository.deleteAll(songList);
    }

}
