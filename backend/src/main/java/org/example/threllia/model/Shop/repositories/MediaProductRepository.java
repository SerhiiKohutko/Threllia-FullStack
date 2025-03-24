package org.example.threllia.model.Shop.repositories;

import org.example.threllia.model.Shop.entities.MediaProduct;
import org.example.threllia.model.Shop.shop_enum.MediaProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MediaProductRepository extends JpaRepository<MediaProduct, Long> {
    @Query(value = "SELECT * FROM media_product", nativeQuery = true)
    List<MediaProduct> getAll();
    Optional<MediaProduct> getMediaProductById(long id);

    @Query(value = "SELECT * FROM media_product WHERE (:type IS NULL OR type = :type) " +
            "AND (:minPrice IS NULL OR price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR price <= :maxPrice)", nativeQuery = true)
    Page<MediaProduct> findAllFiltered(
            @Param("type") MediaProductType type,
            @Param("album") String album,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable
    );


}