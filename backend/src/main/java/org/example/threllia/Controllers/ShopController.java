package org.example.threllia.controllers;

import org.example.threllia.model.Shop.entities.AccessoryProduct;
import org.example.threllia.model.Shop.entities.ApparelProduct;
import org.example.threllia.model.Shop.entities.MediaProduct;
import org.example.threllia.model.Shop.entities.Product;
import org.example.threllia.model.Shop.service.ProductService;
import org.example.threllia.requests.ProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products/")
public class ShopController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getShopOverviewForMVP(@RequestParam int size, @RequestParam int page){
        return new ResponseEntity<>(productService.getProducts(page, size), HttpStatus.OK);
    }


    @GetMapping("/accessories")
    public ResponseEntity<List<AccessoryProduct>> getAllAccessories(){
        List<AccessoryProduct> accessoryProducts = productService.getAllAccessories();
        return ResponseEntity.ok(accessoryProducts);
    }
    @GetMapping("/apparel")
    public ResponseEntity<List<ApparelProduct>> getAllApparel(){
        List<ApparelProduct> apparelProducts = productService.getAllApparel();
        return ResponseEntity.ok(apparelProducts);
    }
    @GetMapping("/mediaProducts")
    public ResponseEntity<List<MediaProduct>> getAllMediaProducts(){
        List<MediaProduct> mediaProducts = productService.getAllMediaProducts();
        return ResponseEntity.ok(mediaProducts);
    }

    @PostMapping
    public Product createProduct(@RequestBody ProductRequest request) throws Exception {
        return productService.createProduct(request);
    }
}
