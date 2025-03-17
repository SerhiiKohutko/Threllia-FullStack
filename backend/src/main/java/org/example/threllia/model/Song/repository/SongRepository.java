package org.example.threllia.model.Song.repository;

import org.example.threllia.model.Song.entities.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SongRepository extends JpaRepository<Song, Long> {
    Optional<Song> findSongById(long id);
    Optional<Song> getSongByTitle(String title);
    boolean existsByTitle(String title);
}
