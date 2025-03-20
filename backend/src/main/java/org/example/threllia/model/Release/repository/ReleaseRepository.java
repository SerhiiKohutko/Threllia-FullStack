package org.example.threllia.model.Release.repository;

import org.example.threllia.model.Release.entities.MusicRelease;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReleaseRepository extends JpaRepository<MusicRelease, Long> {
    Optional<MusicRelease> getReleasesById(long id);

    @Query(value = "select * from music_release order by date_released", nativeQuery = true)
    Page<MusicRelease> getAllReleases(Pageable pageable);
}
