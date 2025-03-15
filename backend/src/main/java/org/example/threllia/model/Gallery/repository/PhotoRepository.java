package org.example.threllia.model.Gallery.repository;

import org.example.threllia.model.Gallery.entities.GalleryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PhotoRepository extends JpaRepository<GalleryItem, Long> {
    @Query(value = "select * from gallery_item order by date desc", nativeQuery = true)
    List<GalleryItem> findAll();
    Optional<GalleryItem> findGalleryItemById(long id);
}
