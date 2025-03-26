package org.example.threllia.model.Shop.service;

import org.example.threllia.model.Shop.entities.AccessoryProduct;
import org.example.threllia.model.Shop.entities.ApparelProduct;
import org.example.threllia.model.Shop.entities.MediaProduct;
import org.example.threllia.model.Shop.entities.Product;
import org.example.threllia.model.Shop.enums.ProductType;
import org.example.threllia.model.Shop.repositories.AccessoriesProductRepository;
import org.example.threllia.model.Shop.repositories.ApparelProductRepository;
import org.example.threllia.model.Shop.repositories.MediaProductRepository;
import org.example.threllia.model.Shop.shop_enum.AccessoriesProductType;
import org.example.threllia.model.Shop.shop_enum.ApparelProductType;
import org.example.threllia.model.Shop.shop_enum.ApparelSizeType;
import org.example.threllia.model.Shop.shop_enum.MediaProductType;
import org.example.threllia.model.Shop.utils.ProductProjection;
import org.example.threllia.requests.ProductRequest;
import org.example.threllia.utils.ParametersTransfer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public Page<? extends Product> getProductsByType(ProductType type, ParametersTransfer parametersTransfer, String subType) {

        return switch (type) {
            case MEDIA -> findMediaProductsFiltered(subType != null
                    ? MediaProductType.valueOf(subType.toUpperCase()) : null, parametersTransfer);

            case APPAREL -> findApparelProductsFiltered(subType != null
                    ? ApparelProductType.valueOf(subType.toUpperCase()) : null, parametersTransfer);

            case ACCESSORIES -> findAccessoryProductsFiltered(subType != null
                    ? AccessoriesProductType.valueOf(subType.toUpperCase()) : null, parametersTransfer);
        };
    }

    private Page<MediaProduct> findMediaProductsFiltered(MediaProductType subtype, ParametersTransfer parametersTransfer){
        PageRequest pageRequest = PageRequest.of(parametersTransfer.getPage(),
                6, Sort.by("date_added").descending());

        if (subtype == null) {
            return mediaProductRepository.findAllFilteredNoSubType(parametersTransfer.getAlbum(), parametersTransfer.getMinPrice(), parametersTransfer.getMaxPrice(), pageRequest);
        }

        return mediaProductRepository.findAllFiltered(subtype, parametersTransfer.getAlbum(), parametersTransfer.getMinPrice(), parametersTransfer.getMaxPrice(), pageRequest);
    }

    private Page<AccessoryProduct> findAccessoryProductsFiltered(AccessoriesProductType subtype, ParametersTransfer parametersTransfer){
        PageRequest pageRequest = PageRequest.of(parametersTransfer.getPage(),
                6, Sort.by("date_added").descending());
        if (subtype == null) {
            return accessoriesProductRepository.findAllFilteredNoSubType(parametersTransfer.getAlbum(), parametersTransfer.getMinPrice(), parametersTransfer.getMaxPrice(), pageRequest);
        }
        return accessoriesProductRepository.findAllFiltered(subtype, parametersTransfer.getAlbum(), parametersTransfer.getMinPrice(), parametersTransfer.getMaxPrice(), pageRequest);
    }

    private Page<ApparelProduct> findApparelProductsFiltered(ApparelProductType subtype, ParametersTransfer parametersTransfer){
        System.out.println("PAGE : " + parametersTransfer.getPage());
        PageRequest pageRequest = PageRequest.of(parametersTransfer.getPage(),
                6, Sort.by("date_added").descending());

        if (subtype == null) {
            return apparelProductRepository.findAllFilteredNoSubType(parametersTransfer.getAlbum(), parametersTransfer.getMinPrice(), parametersTransfer.getMaxPrice(), pageRequest);
        }

        return apparelProductRepository.findAllFiltered(subtype, parametersTransfer.getAlbum(), parametersTransfer.getMinPrice(), parametersTransfer.getMaxPrice(), pageRequest);
    }

    @Override
    public List<Product> getAllProducts() {
        ArrayList<Product> products = new ArrayList<>(apparelProductRepository.getAll());
        products.addAll(mediaProductRepository.getAll());
        products.addAll(accessoriesProductRepository.getAll());
        products.sort(Comparator.comparing(Product::getDateAdded,
                Comparator.nullsLast(Comparator.naturalOrder())));
        return products;
    }

    @Override
    public Page<ProductProjection> getAllProductsPaginated(ParametersTransfer parametersTransfer) {
        PageRequest pageRequest = PageRequest.of(parametersTransfer.getPage(), 6, Sort.by("date_added").descending());
        return apparelProductRepository.getAllProductsPaginated(parametersTransfer.getAlbum(), parametersTransfer.getMinPrice(), parametersTransfer.getMaxPrice(), pageRequest);
    }

    @Deprecated
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

    @Deprecated
    @Override
    public List<AccessoryProduct> getAllAccessories() {
        return accessoriesProductRepository.getAll();
    }

    @Deprecated
    @Override
    public List<MediaProduct> getAllMediaProducts() {
        return mediaProductRepository.getAll();
    }

    @Deprecated
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


    //ADMIN FUNCTIONALITY
    @Override
    public Product createProduct(ProductRequest request) throws Exception {
        switch (request.getType()){
            case MEDIA -> {
                return createMediaProduct(request);
            }
            case APPAREL -> {
                return createApparelProduct(request);
            }
            case ACCESSORIES -> {
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
                .dateAdded(LocalDate.now())
                .build();

        return mediaProductRepository.save(mediaProduct);
    }
    public ApparelProduct createApparelProduct(ProductRequest request){
        ApparelProduct apparelProduct = ApparelProduct.builder()
                .name(request.getName())
                .type(request.getApparelProductType())
                .price(request.getPrice())
                .description(request.getDescription())
                .dateAdded(LocalDate.now())
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
                .dateAdded(LocalDate.now())
                .build();

        return accessoriesProductRepository.save(accessoryProduct);
    }

}
