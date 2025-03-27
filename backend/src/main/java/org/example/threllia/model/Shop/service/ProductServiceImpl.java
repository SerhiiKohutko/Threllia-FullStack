package org.example.threllia.model.Shop.service;

import org.example.threllia.model.Shop.dto.ProductDTO;
import org.example.threllia.model.Shop.entities.AccessoryProduct;
import org.example.threllia.model.Shop.entities.ApparelProduct;
import org.example.threllia.model.Shop.entities.MediaProduct;
import org.example.threllia.model.Shop.entities.Product;
import org.example.threllia.model.Shop.repositories.AccessoriesProductRepository;
import org.example.threllia.model.Shop.repositories.ApparelProductRepository;
import org.example.threllia.model.Shop.repositories.MediaProductRepository;
import org.example.threllia.model.Shop.shop_enum.*;
import org.example.threllia.requests.ProductRequest;
import org.example.threllia.utils.ShopParametersTransfer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public Page<? extends Product> getProductsByType(ProductType type, ShopParametersTransfer shopParametersTransfer, String subType) {

        return switch (type) {
            case MEDIA -> findMediaProductsFiltered(subType != null
                    ? MediaProductType.valueOf(subType) : null, shopParametersTransfer);

            case APPAREL -> findApparelProductsFiltered(subType != null
                    ? ApparelProductType.valueOf(subType) : null, shopParametersTransfer);

            case ACCESSORIES -> findAccessoryProductsFiltered(subType != null
                    ? AccessoriesProductType.valueOf(subType) : null, shopParametersTransfer);
        };
    }

    private Page<MediaProduct> findMediaProductsFiltered(MediaProductType subtype, ShopParametersTransfer shopParametersTransfer){
        PageRequest pageRequest = PageRequest.of(shopParametersTransfer.getPage(),
                6, getSortingOrder(shopParametersTransfer.getSortingType()));

        if (subtype == null) {
            return mediaProductRepository.findAllFilteredNoSubType(shopParametersTransfer.getAlbum(), shopParametersTransfer.getMinPrice(), shopParametersTransfer.getMaxPrice(), pageRequest);
        }

        return mediaProductRepository.findAllFiltered(subtype, shopParametersTransfer.getAlbum(), shopParametersTransfer.getMinPrice(), shopParametersTransfer.getMaxPrice(), pageRequest);
    }

    private Page<AccessoryProduct> findAccessoryProductsFiltered(AccessoriesProductType subtype, ShopParametersTransfer shopParametersTransfer){
        PageRequest pageRequest = PageRequest.of(shopParametersTransfer.getPage(),
                6, getSortingOrder(shopParametersTransfer.getSortingType()));
        if (subtype == null) {
            return accessoriesProductRepository.findAllFilteredNoSubType(shopParametersTransfer.getAlbum(), shopParametersTransfer.getMinPrice(), shopParametersTransfer.getMaxPrice(), pageRequest);
        }
        return accessoriesProductRepository.findAllFiltered(subtype, shopParametersTransfer.getAlbum(), shopParametersTransfer.getMinPrice(), shopParametersTransfer.getMaxPrice(), pageRequest);
    }

    private Page<ApparelProduct> findApparelProductsFiltered(ApparelProductType subtype, ShopParametersTransfer shopParametersTransfer){
        System.out.println("PAGE : " + shopParametersTransfer.getPage());
        PageRequest pageRequest = PageRequest.of(shopParametersTransfer.getPage(),
                6, getSortingOrder(shopParametersTransfer.getSortingType()));

        if (subtype == null) {
            return apparelProductRepository.findAllFilteredNoSubType(shopParametersTransfer.getAlbum(), shopParametersTransfer.getMinPrice(), shopParametersTransfer.getMaxPrice(), pageRequest);
        }

        return apparelProductRepository.findAllFiltered(subtype, shopParametersTransfer.getAlbum(), shopParametersTransfer.getMinPrice(), shopParametersTransfer.getMaxPrice(), pageRequest);
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
    public Page<ProductDTO> getAllProductsPaginated(ShopParametersTransfer shopParametersTransfer) {

        Sort sort = getSortingOrder(shopParametersTransfer.getSortingType());

        PageRequest pageRequest = PageRequest.of(shopParametersTransfer.getPage(), 6, sort);
        return apparelProductRepository.getAllProductsPaginated(shopParametersTransfer.getAlbum(),
                shopParametersTransfer.getMinPrice(), shopParametersTransfer.getMaxPrice(),
                pageRequest).map(this::convertToProductDTO);
    }

    private ProductDTO convertToProductDTO(Object[] row){
        System.out.println(Arrays.toString(row));

        return ProductDTO.builder()
                .id(((Number) row[0]).longValue())
                .name((String) row[1])
                .price((Double) row[4])
                .productType((String) row[5])
                .imageUrl((String) row[2])
                .totalQuantity((Integer) row[6])
                .build();
    }

    private Sort getSortingOrder(ShopSortingType shopSortingType){
        return switch (shopSortingType){
            case ASC_DATE -> Sort.by("date_added").ascending();
            case DSC_DATE -> Sort.by("date_added").descending();
            case ASC_PRICE -> Sort.by("price").ascending();
            case DSC_PRICE -> Sort.by("price").descending();
        };
    }

    @Override
    public Optional<? extends Product> getProductById(int id, ProductType productType) {
        return switch (productType) {
            case APPAREL -> getApparelById(id);
            case MEDIA -> getMediaProductById(id);
            case ACCESSORIES -> getAccessoryById(id);
        };
    }

    private Optional<ApparelProduct> getApparelById(long id) {
        return apparelProductRepository.getApparelProductById(id);
    }


    private Optional<AccessoryProduct> getAccessoryById(long id) {
        return accessoriesProductRepository.getAccessoryProductById(id);
    }


    private Optional<MediaProduct> getMediaProductById(long id) {
        return mediaProductRepository.getMediaProductById(id);
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
