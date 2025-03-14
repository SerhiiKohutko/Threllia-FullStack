package org.example.threllia.Modal.Shop.service;

import org.example.threllia.Modal.Shop.entities.AccessoryProduct;
import org.example.threllia.Modal.Shop.entities.ApparelProduct;
import org.example.threllia.Modal.Shop.entities.MediaProduct;
import org.example.threllia.Modal.Shop.entities.Product;
import org.example.threllia.Modal.Shop.repositories.AccessoriesProductRepository;
import org.example.threllia.Modal.Shop.repositories.ApparelProductRepository;
import org.example.threllia.Modal.Shop.repositories.MediaProductRepository;
import org.example.threllia.Modal.Shop.shop_enum.ApparelSizeType;
import org.example.threllia.requests.ProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ApparelProductRepository apparelProductRepository;
    @Autowired
    private MediaProductRepository mediaProductRepository;
    @Autowired
    private AccessoriesProductRepository accessoriesProductRepository;

    @Override
    public List<Product> getProducts(int page, int size) {
        List<Product> mixedProducts = new ArrayList<>();

        Pageable pageable = PageRequest.of(page, size);
        Page<MediaProduct> mediaProducts = mediaProductRepository.findAll(pageable);
        Page<AccessoryProduct> accessories = accessoriesProductRepository.findAll(pageable);
        Page<ApparelProduct> apparel = apparelProductRepository.findAll(pageable);

        mediaProducts.forEach(mixedProducts::add);
        accessories.forEach(mixedProducts::add);
        apparel.forEach(mixedProducts::add);

        Collections.shuffle(mixedProducts);

        return mixedProducts;
    }

    @Override
    public List<AccessoryProduct> getAllAccessories() {
        return accessoriesProductRepository.getAll();
    }

    @Override
    public List<MediaProduct> getAllMediaProducts() {
        return mediaProductRepository.getAll();
    }

    @Override
    public List<ApparelProduct> getAllApparel() {
        return apparelProductRepository.getAll();
    }

    @Override
    public ApparelProduct getApparelById(long id) {
        return apparelProductRepository.getApparelProductById(id).orElseThrow(() -> new ExpressionException("No product find with id = " + id));
    }

    @Override
    public AccessoryProduct getAccessoryById(long id) {
        return accessoriesProductRepository.getAccessoryProductById(id).orElseThrow(() -> new ExpressionException("No product find with id = " + id));
    }

    @Override
    public MediaProduct getMediaProductById(long id) {
        return mediaProductRepository.getMediaProductById(id).orElseThrow(() -> new ExpressionException("No product find with id = " + id));
    }

    @Override
    public Product createProduct(ProductRequest request) throws Exception {
        switch (request.getType()){
            case MEDIA -> {
                return createMediaProduct(request);
            }
            case APPAREL -> {
                return createApparelProduct(request);
            }
            case ACCESSORY -> {
                return createAccessoryProduct(request);
            }
        }
        throw new Exception("No such type");
    }

    public MediaProduct createMediaProduct(ProductRequest request){
        MediaProduct mediaProduct = MediaProduct.builder()
                .name(request.getName())
                .type(request.getMediaProductType())
                .price(request.getPrice())
                .description(request.getDescription())
                .totalQuantity(request.getTotalQuantity())
                .build();

        return mediaProductRepository.save(mediaProduct);
    }
    public ApparelProduct createApparelProduct(ProductRequest request){
        ApparelProduct apparelProduct = ApparelProduct.builder()
                .name(request.getName())
                .type(request.getApparelProductType())
                .price(request.getPrice())
                .description(request.getDescription())
                .build();

        int totalQuantity = 0;
        for (Map.Entry<ApparelSizeType, Integer> el : request.getMap().entrySet()){
            apparelProduct.getSizeToQuantityMap().put(el.getKey(), el.getValue());
            totalQuantity += el.getValue();
        }
        apparelProduct.setTotalQuantity(totalQuantity);

        return apparelProductRepository.save(apparelProduct);
    }
    public AccessoryProduct createAccessoryProduct(ProductRequest request){
        AccessoryProduct accessoryProduct = AccessoryProduct.builder()
                .type(request.getAccessoriesProductType())
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .totalQuantity(request.getTotalQuantity())
                .build();

        return accessoriesProductRepository.save(accessoryProduct);
    }

}
