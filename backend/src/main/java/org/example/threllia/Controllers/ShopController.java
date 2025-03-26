package org.example.threllia.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.threllia.model.Shop.entities.AccessoryProduct;
import org.example.threllia.model.Shop.entities.ApparelProduct;
import org.example.threllia.model.Shop.entities.MediaProduct;
import org.example.threllia.model.Shop.entities.Product;
import org.example.threllia.model.Shop.enums.ProductType;
import org.example.threllia.model.Shop.service.ProductService;
import org.example.threllia.model.Shop.utils.ProductProjection;
import org.example.threllia.requests.ProductRequest;
import org.example.threllia.utils.ParametersTransfer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products/")
public class ShopController {
    @Autowired
    private ProductService productService;


    @Deprecated
    @GetMapping
    public ResponseEntity<List<Product>> getShopOverviewForMVP(@RequestParam int size, @RequestParam int page){
        return new ResponseEntity<>(productService.getProducts(page, size), HttpStatus.OK);
    }


    @Deprecated
    @GetMapping("/accessories")
    public ResponseEntity<List<AccessoryProduct>> getAllAccessories(){
        List<AccessoryProduct> accessoryProducts = productService.getAllAccessories();
        return ResponseEntity.ok(accessoryProducts);
    }

    @Deprecated
    @GetMapping("/apparel")
    public ResponseEntity<List<ApparelProduct>> getAllApparel(){
        List<ApparelProduct> apparelProducts = productService.getAllApparel();
        return ResponseEntity.ok(apparelProducts);
    }

    @Deprecated
    @GetMapping("/mediaProducts")
    public ResponseEntity<List<MediaProduct>> getAllMediaProducts(){
        List<MediaProduct> mediaProducts = productService.getAllMediaProducts();
        return ResponseEntity.ok(mediaProducts);
    }

    @GetMapping("/all_paginated")
    public ResponseEntity<Page<ProductProjection>> getAllProducts(@RequestParam(defaultValue = "0") int page,
                                                                  @RequestParam(required = false) Double minPrice,
                                                                  @RequestParam(required = false) Double maxPrice,
                                                                  @RequestParam(required = false) String album){

        ParametersTransfer parametersTransfer = new ParametersTransfer(album, minPrice, maxPrice, page);

        return ResponseEntity.ok(productService.getAllProductsPaginated(parametersTransfer));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{productType}")
    public ResponseEntity<Page<? extends Product>> getProductsByType(
            @PathVariable ProductType productType,
            @RequestParam(required = false) String subType,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String album,
            @RequestParam(defaultValue = "0") int page) throws JsonProcessingException {

        ParametersTransfer parametersTransfer = new ParametersTransfer(album, minPrice, maxPrice, page);

        System.out.println(minPrice);

        Page<? extends Product> products =
                productService.getProductsByType(productType, parametersTransfer, subType);

        return ResponseEntity.ok(products);
    }

    @PostMapping
    public Product createProduct(@RequestBody ProductRequest request) throws Exception {
        return productService.createProduct(request);
    }
}
