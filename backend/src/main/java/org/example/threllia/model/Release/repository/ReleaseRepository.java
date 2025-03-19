package org.example.threllia.model.Release.repository;

import org.example.threllia.model.Release.entities.MusicRelease;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReleaseRepository extends JpaRepository<MusicRelease, Long> {
    Optional<MusicRelease> getReleasesById(long id);
}
