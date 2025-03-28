package org.example.threllia.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.threllia.exceptions.ProductNotFoundException;
import org.example.threllia.model.Shop.dto.ProductDTO;
import org.example.threllia.model.Shop.entities.AccessoryProduct;
import org.example.threllia.model.Shop.entities.ApparelProduct;
import org.example.threllia.model.Shop.entities.MediaProduct;
import org.example.threllia.model.Shop.entities.Product;
import org.example.threllia.model.Shop.service.ProductService;
import org.example.threllia.model.Shop.shop_enum.ProductType;
import org.example.threllia.model.Shop.shop_enum.ShopSortingType;
import org.example.threllia.requests.ProductRequest;
import org.example.threllia.utils.FileUploader;
import org.example.threllia.utils.ShopParametersTransfer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

//TODO - autowire object mapper in other controllers

@RestController
@RequestMapping("/api/products")
public class ShopController {
    @Autowired
    private ProductService productService;
    @Autowired
    private ObjectMapper objectMapper;


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
    public ResponseEntity<Page<ProductDTO>> getAllProducts(@RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "6") int size,
                                                           @RequestParam(required = false) Double minPrice,
                                                           @RequestParam(required = false) Double maxPrice,
                                                           @RequestParam(required = false) String album,
                                                           @RequestParam(defaultValue = "DSC_DATE") ShopSortingType shopSortingType){

        ShopParametersTransfer shopParametersTransfer = new ShopParametersTransfer(album, minPrice, maxPrice, page, size, shopSortingType);

        return ResponseEntity.ok(productService.getAllProductsPaginated(shopParametersTransfer));
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
            @RequestParam(defaultValue = "DSC_DATE") ShopSortingType shopSortingType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) throws JsonProcessingException {

        ShopParametersTransfer shopParametersTransfer = new ShopParametersTransfer(album, minPrice, maxPrice, page, size, shopSortingType);

        Page<? extends Product> products =
                productService.getProductsByType(productType, shopParametersTransfer, subType);

        return ResponseEntity.ok(products);
    }

    @GetMapping("/{productType}/{id}")
    public ResponseEntity<? extends Product> getProductById(@PathVariable int id, @PathVariable ProductType productType){

        System.out.println("ID: " + id + " Category : " + productType);

        return ResponseEntity.ok(productService.getProductById(id, productType)
                .orElseThrow(() ->  new ProductNotFoundException("No product with such id")));
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<String> handleProductNotFoundException(Exception e){
        return ResponseEntity.internalServerError().body(e.getMessage());
    }

    @GetMapping("/{release_name}/get_related_merch")
    public ResponseEntity<List<Product>> getRelatedMerch(@PathVariable String release_name){
        return null;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product createProduct(@RequestParam("data") String  data, @RequestParam("coverImage") MultipartFile image) throws Exception {

        String imageName = FileUploader.uploadProductImage(image);

        ProductRequest request = objectMapper.readValue(data, ProductRequest.class);

        return productService.createProduct(request, imageName);
    }
}
