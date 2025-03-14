package org.example.threllia.model.Gallery.repository;

import org.example.threllia.model.Gallery.entities.Photographer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PhotographerRepository extends JpaRepository<Photographer, Long> {

    Optional<Photographer> findPhotographerByName(String name);
}
