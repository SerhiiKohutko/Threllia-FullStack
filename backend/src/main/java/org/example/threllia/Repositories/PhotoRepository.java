package org.example.threllia.Repositories;

import org.example.threllia.Modal.Gallery.entities.GalleryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PhotoRepository extends JpaRepository<GalleryItem, Long> {
    @Query(value = "select * from gallery_items order by date desc", nativeQuery = true)
    List<GalleryItem> findAll();
    Optional<GalleryItem> findGalleryItemById(long id);
}
