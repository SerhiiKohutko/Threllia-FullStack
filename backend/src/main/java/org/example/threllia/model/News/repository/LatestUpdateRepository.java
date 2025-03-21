package org.example.threllia.model.News.repository;

import org.example.threllia.model.News.entities.LatestUpdate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LatestUpdateRepository extends JpaRepository<LatestUpdate, Long> {
    @Query(value = "select * from latest_update order by date_created desc", nativeQuery = true)
    List<LatestUpdate> findAll();
    Page<LatestUpdate> findAll(Pageable pageable);
    Optional<LatestUpdate> findLatestUpdateById(long id);
}
