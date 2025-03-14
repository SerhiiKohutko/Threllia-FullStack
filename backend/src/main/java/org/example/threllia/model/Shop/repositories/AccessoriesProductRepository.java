package org.example.threllia.model.Shop.repositories;

import org.example.threllia.model.Shop.entities.AccessoryProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AccessoriesProductRepository extends JpaRepository<AccessoryProduct, Long> {
    @Query(value = "SELECT * FROM accessory_product", nativeQuery = true)
    List<AccessoryProduct> getAll();
    Optional<AccessoryProduct> getAccessoryProductById(long id);
}
