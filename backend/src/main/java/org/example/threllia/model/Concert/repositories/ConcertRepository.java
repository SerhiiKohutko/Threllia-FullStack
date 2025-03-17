package org.example.threllia.model.Concert.repositories;

import org.example.threllia.model.Concert.concert_enum.ConcertStatus;
import org.example.threllia.model.Concert.entities.Concert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ConcertRepository extends JpaRepository<Concert, Long> {
    List<Concert> getTourItemsByStatus(ConcertStatus status);

    @Query(value = "SELECT * FROM concert ORDER BY date ASC LIMIT 6", nativeQuery = true)
    List<Concert> getConcertByStatusOrderByDate(ConcertStatus status);

    Optional<Concert> getConcertById(long id);
}
