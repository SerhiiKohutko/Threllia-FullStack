package org.example.threllia.model.Shop.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.threllia.model.Shop.dto.ProductDTO;
import org.example.threllia.model.Shop.entities.AccessoryProduct;
import org.example.threllia.model.Shop.entities.ApparelProduct;
import org.example.threllia.model.Shop.entities.MediaProduct;
import org.example.threllia.model.Shop.entities.Product;
import org.example.threllia.model.Shop.shop_enum.ProductType;
import org.example.threllia.requests.ProductRequest;
import org.example.threllia.utils.ShopParametersTransfer;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> getProducts(int page, int size);
    List<AccessoryProduct> getAllAccessories();
    List<MediaProduct> getAllMediaProducts();
    List<ApparelProduct> getAllApparel();

    Product createProduct(ProductRequest request, String imageName) throws Exception;

    Page<? extends Product> getProductsByType(ProductType type, ShopParametersTransfer shopParametersTransfer, String subType) throws JsonProcessingException;
    List<Product> getAllProducts();
    Page<ProductDTO> getAllProductsPaginated(ShopParametersTransfer shopParametersTransfer);

    Optional<? extends Product> getProductById(int id, ProductType productType);
}
