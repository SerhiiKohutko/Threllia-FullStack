package org.example.threllia.Repositories;

import org.example.threllia.Modal.News.LatestUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LatestUpdateRepository extends JpaRepository<LatestUpdate, Long> {
    @Query(value = "select * from latest_update order by date_created desc", nativeQuery = true)
    List<LatestUpdate> findAll();
    Optional<LatestUpdate> findLatestUpdateById(long id);
}
