package org.example.threllia.model.Shop.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.threllia.model.Shop.entities.AccessoryProduct;
import org.example.threllia.model.Shop.entities.ApparelProduct;
import org.example.threllia.model.Shop.entities.MediaProduct;
import org.example.threllia.model.Shop.entities.Product;
import org.example.threllia.model.Shop.enums.ProductType;
import org.example.threllia.model.Shop.utils.ProductProjection;
import org.example.threllia.requests.ProductRequest;
import org.example.threllia.utils.ParametersTransfer;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    List<Product> getProducts(int page, int size);
    List<AccessoryProduct> getAllAccessories();
    List<MediaProduct> getAllMediaProducts();
    List<ApparelProduct> getAllApparel();

    ApparelProduct getApparelById(long id);
    AccessoryProduct getAccessoryById(long id);
    MediaProduct getMediaProductById(long id);
    Product createProduct(ProductRequest request) throws Exception;

    Page<? extends Product> getProductsByType(ProductType type, ParametersTransfer parametersTransfer, String subType) throws JsonProcessingException;
    List<Product> getAllProducts();
    Page<ProductProjection> getAllProductsPaginated(ParametersTransfer parametersTransfer);
}
