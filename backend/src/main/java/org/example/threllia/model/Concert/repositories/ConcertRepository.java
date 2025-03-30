package org.example.threllia.model.Concert.repositories;

import org.example.threllia.model.Concert.concert_enum.ConcertStatus;
import org.example.threllia.model.Concert.entities.Concert;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConcertRepository extends JpaRepository<Concert, Long> {
    List<Concert> getTourItemsByStatus(ConcertStatus status);


    Page<Concert> findByStatus(ConcertStatus status, Pageable page);

    @Query(value = "SELECT * FROM concert where status = :status ORDER BY date ASC LIMIT 6", nativeQuery = true)
    List<Concert> getActiveConcertsOrderByDate(@Param("status") ConcertStatus status);

    Optional<Concert> getConcertById(long id);

    @Query(value = "SELECT * FROM concert " +
            "JOIN concert_song_list ON concert.id = concert_song_list.concert_id " +
            "WHERE concert_song_list.song_id = :songId ORDER BY date DESC", nativeQuery = true)
    Page<Concert> getConcertBySongsListContainingId(long songId, Pageable pageable);
}
