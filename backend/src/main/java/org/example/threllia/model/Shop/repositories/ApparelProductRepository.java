package org.example.threllia.model.Shop.repositories;

import org.example.threllia.model.Shop.entities.ApparelProduct;
import org.example.threllia.model.Shop.shop_enum.ApparelProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApparelProductRepository extends JpaRepository<ApparelProduct, Long> {
    @Query(value = "SELECT * FROM apparel_product", nativeQuery = true)
    List<ApparelProduct> getAll();
    Optional<ApparelProduct> getApparelProductById(long id);

    @Query(value = "SELECT * FROM apparel_product WHERE (:type IS NULL OR type = :type) " +
            "AND (:minPrice IS NULL OR price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR price <= :maxPrice)", nativeQuery = true)
    Page<ApparelProduct> findAllFiltered(
            @Param("type") ApparelProductType type,
            @Param("album") String album,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable
    );


    @Query(value = "SELECT * FROM (" +
            "SELECT CONCAT('MEDIA_', id) AS global_id, id, name, image_url, date_added, price, 'MEDIA' AS product_type, total_quantity FROM media_product " +
            "UNION ALL " +
            "SELECT CONCAT('APPAREL_', id) AS global_id, id, name, image_url, date_added, price, 'APPAREL' AS product_type, total_quantity FROM apparel_product " +
            "UNION ALL " +
            "SELECT CONCAT('ACCESSORIES_', id) AS global_id, id, name, image_url, date_added, price, 'ACCESSORIES' AS product_type, total_quantity FROM accessory_product" +
            ") AS combined " +
            "WHERE (:minPrice IS NULL OR price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR price <= :maxPrice)",
            countQuery = "SELECT COUNT(*) FROM (" +
                    "SELECT CONCAT('MEDIA_', id) AS global_id, id, name, image_url, date_added, price, 'MEDIA' AS product_type, total_quantity FROM media_product " +
                    "UNION ALL " +
                    "SELECT CONCAT('APPAREL_', id) AS global_id, id, name, image_url, date_added, price, 'APPAREL' AS product_type, total_quantity FROM apparel_product " +
                    "UNION ALL " +
                    "SELECT CONCAT('ACCESSORIES_', id) AS global_id, id, name, image_url, date_added, price, 'ACCESSORIES' AS product_type, total_quantity FROM accessory_product" +
                    ") AS combined " +
                    "WHERE (:minPrice IS NULL OR price >= :minPrice) " +
                    "AND (:maxPrice IS NULL OR price <= :maxPrice)",
            nativeQuery = true)
    Page<Object[]> getAllProductsPaginated(@Param("minPrice") Double minPrice,
                                           @Param("maxPrice") Double maxPrice,
                                           Pageable pageable);




    @Query(value = "SELECT * FROM apparel_product WHERE  " +
            "(:minPrice IS NULL OR price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR price <= :maxPrice)", nativeQuery = true)
    Page<ApparelProduct> findAllFilteredNoSubType(
            @Param("album") String album,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable
    );
}
