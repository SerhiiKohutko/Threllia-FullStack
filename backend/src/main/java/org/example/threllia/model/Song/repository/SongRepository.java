package org.example.threllia.model.Song.repository;

import org.example.threllia.model.Song.entities.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SongRepository extends JpaRepository<Song, Long> {
    Optional<Song> findSongById(long id);
    Optional<Song> getSongByTitle(String title);
    boolean existsByTitle(String title);

    @Query(value = "select * from song order by title asc", nativeQuery = true)
    List<Song> getAllByNameOrdered();
}
