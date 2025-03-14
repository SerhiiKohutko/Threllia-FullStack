package org.example.threllia.model.Shop.repositories;

import org.example.threllia.model.Shop.entities.ApparelProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ApparelProductRepository extends JpaRepository<ApparelProduct, Long> {
    @Query(value = "SELECT * FROM apparel_product", nativeQuery = true)
    List<ApparelProduct> getAll();
    Optional<ApparelProduct> getApparelProductById(long id);
}
