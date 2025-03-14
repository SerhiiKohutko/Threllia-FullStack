package org.example.threllia.Repositories;

import org.example.threllia.Modal.Gallery.GalleryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PhotoRepository extends JpaRepository<GalleryItem, Long> {
    @Query("select * from gallery_items order by date")
    List<GalleryItem> findAll();
    Optional<GalleryItem> findGalleryItemById(long id);
}
