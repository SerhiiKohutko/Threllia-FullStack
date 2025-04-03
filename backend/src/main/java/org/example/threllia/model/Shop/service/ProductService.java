package org.example.threllia.model.Shop.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.threllia.model.Shop.dto.ProductDTO;
import org.example.threllia.model.Shop.entities.Product;
import org.example.threllia.model.Shop.shop_enum.ProductType;
import org.example.threllia.requests.ProductRequest;
import org.example.threllia.utils.ShopParametersTransfer;
import org.springframework.data.domain.Page;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    Product createProduct(ProductRequest request, String imageName) throws Exception;

    Page<? extends Product> getProductsByType(ProductType type, ShopParametersTransfer shopParametersTransfer, String subType) throws JsonProcessingException;
    List<Product> getAllProducts();
    Page<ProductDTO> getAllProductsPaginated(ShopParametersTransfer shopParametersTransfer);

    Optional<? extends Product> getProductById(int id, ProductType productType);

    Product updateProductById(long id, ProductRequest request, String imageName) throws IOException;

    void deleteProductById(long id, ProductType type);
}



