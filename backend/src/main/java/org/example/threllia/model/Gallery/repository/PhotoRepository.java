package org.example.threllia.model.Gallery.repository;

import org.example.threllia.model.Gallery.entities.PhotoCollection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PhotoRepository extends JpaRepository<PhotoCollection, Long> {
    @Query(value = "select * from gallery_item order by date desc", nativeQuery = true)
    List<PhotoCollection> findAll();
    Optional<PhotoCollection> findGalleryItemById(long id);

    @Query(value = "select * from photo_collection", nativeQuery = true)
    Page<PhotoCollection> getAllGalleryItems(Pageable pageable);
}
