package org.example.threllia.model.Shop.repositories;

import org.example.threllia.model.Shop.entities.MediaProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MediaProductRepository extends JpaRepository<MediaProduct, Long> {
    @Query(value = "SELECT * FROM media_product", nativeQuery = true)
    List<MediaProduct> getAll();
    Optional<MediaProduct> getMediaProductById(long id);
}