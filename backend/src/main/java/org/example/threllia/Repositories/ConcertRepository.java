package org.example.threllia.Repositories;

import org.example.threllia.Enums.ConcertStatus;
import org.example.threllia.Modal.Concert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConcertRepository extends JpaRepository<Concert, Long> {
    List<Concert> getTourItemsByStatus(ConcertStatus status);
}
