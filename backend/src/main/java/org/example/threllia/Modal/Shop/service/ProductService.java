package org.example.threllia.Modal.Shop.service;

import org.example.threllia.Modal.Shop.entities.AccessoryProduct;
import org.example.threllia.Modal.Shop.entities.ApparelProduct;
import org.example.threllia.Modal.Shop.entities.MediaProduct;
import org.example.threllia.Modal.Shop.entities.Product;
import org.example.threllia.requests.ProductRequest;

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
}
