package org.example.threllia.model.Song.service;

import org.example.threllia.dto.MusicReleaseDTO;
import org.example.threllia.dto.SongDTO;
import org.example.threllia.dto.SongsOrderedDTO;
import org.example.threllia.model.Concert.entities.Concert;
import org.example.threllia.model.Concert.repositories.ConcertRepository;
import org.example.threllia.model.Release.entities.MusicRelease;
import org.example.threllia.model.Song.entities.Song;
import org.example.threllia.model.Song.repository.SongRepository;
import org.example.threllia.requests.SongCreationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SongServiceImpl implements SongService{
    @Autowired
    private SongRepository songRepository;
    @Autowired
    private ConcertRepository concertRepository;

    @Override
    public SongsOrderedDTO getAllSongsAlphabeticallyOrdered() {
        List<Song> list = songRepository.getAllByNameOrdered();
        TreeSet<Character> characters = new TreeSet<>();

        for (Song song : list) {
            characters.add(song.getTitle().charAt(0));
        }

        SongsOrderedDTO songsOrderedDTO = new SongsOrderedDTO();
        songsOrderedDTO.setSongs(mapEveryToSongDTO(list));
        songsOrderedDTO.setCharacters(characters);

        return songsOrderedDTO;
    }

    private List<SongDTO> mapEveryToSongDTO(List<Song> songs){
        return songs.stream().map(this::getSongDTO).toList();
    }

    private SongDTO getSongDTO(Song song){
        SongDTO songDTO = new SongDTO();

        songDTO.setTitle(song.getTitle());
        songDTO.setId(song.getId());

        return songDTO;
    }

    @Override
    public SongDTO getSongById(long id) throws Exception {
        Song song = songRepository.findSongById(id).orElseThrow(() -> new Exception("No such song found with id = " + id));


        SongDTO songDTO = new SongDTO();
        songDTO.setLyrics(song.getLyrics());
        songDTO.setTitle(song.getTitle());
        songDTO.setAuthors(song.getAuthors());
        songDTO.setAppearedOn(mapEveryToMusicReleaseDTO(song.getAppearedOn()));

        List<Concert> concerts = song.getConcertPlayed();
        concerts.sort(Comparator.comparing(Concert::getDate));

        songDTO.setFirstTimePlayed(!concerts.isEmpty() ? concerts.get(0).getDate() : null);
        songDTO.setLastTimePlayed(!concerts.isEmpty() ? concerts.get(concerts.size() - 1).getDate() : null);

        return songDTO;
    }

    private Set<MusicReleaseDTO> mapEveryToMusicReleaseDTO(Set<MusicRelease> musicReleases) {
        return musicReleases.stream().map(this::getMusicReleaseDTO).collect(Collectors.toSet());
    }

    private MusicReleaseDTO getMusicReleaseDTO(MusicRelease musicRelease){
        MusicReleaseDTO musicReleaseDTO = new MusicReleaseDTO();

        musicReleaseDTO.setId(musicRelease.getId());
        musicReleaseDTO.setTrackList(musicRelease.getTrackList().stream().map(Song::getTitle).toList());
        musicReleaseDTO.setDateReleased(musicRelease.getDateReleased());
        musicReleaseDTO.setDescription(musicRelease.getDescription());
        musicReleaseDTO.setCoverName(musicRelease.getCoverName());
        musicReleaseDTO.setNameToInstrumentsPlayed(musicRelease.getNameToInstrumentsPlayed());

        return musicReleaseDTO;
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
    public Song updateSong(long id, SongCreationRequest songCreationRequest) throws Exception {
        Song song = songRepository.findSongById(id).orElseThrow(() -> new Exception("No song found"));
        song.setLyrics(parseLyricsToHtml(songCreationRequest.getLyrics()));
        song.setTitle(songCreationRequest.getTitle());
        song.setAuthors(songCreationRequest.getAuthors());

        return songRepository.save(song);
    }

    @Override
    public void deleteSong(long id) {
        songRepository.deleteById(id);
    }

    @Override
    public Song addSong(SongCreationRequest request) {

        if (songRepository.existsByTitle(request.getTitle())) {
            throw new IllegalArgumentException("Song exists with such title!");
        }

        Song savedSong = new Song();

        savedSong.setTitle(request.getTitle());

        savedSong.setLyrics(parseLyricsToHtml(request.getLyrics()));

        return songRepository.save(savedSong);
    }

    private String parseLyricsToHtml(String lyrics){
        StringBuilder builder = new StringBuilder();

        for (String line : lyrics.split("\\n")) {
            builder.append(line).append("<br>");
        }

        return builder.toString();
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
