package org.example.threllia.model.Shop.repositories;

import org.example.threllia.model.Shop.entities.AccessoryProduct;
import org.example.threllia.model.Shop.shop_enum.AccessoriesProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccessoriesProductRepository extends JpaRepository<AccessoryProduct, Long> {
    @Query(value = "SELECT * FROM accessory_product", nativeQuery = true)
    List<AccessoryProduct> getAll();
    Optional<AccessoryProduct> getAccessoryProductById(long id);

    @Query(value = "SELECT * FROM accessory_product WHERE (:type IS NULL OR type = :type) " +
            "AND (:minPrice IS NULL OR price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR price <= :maxPrice)", nativeQuery = true)
    Page<AccessoryProduct> findAllFiltered(
            @Param("type") AccessoriesProductType type,
            @Param("album") String album,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable
    );
}
