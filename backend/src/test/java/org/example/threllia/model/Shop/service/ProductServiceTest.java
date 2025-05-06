package org.example.threllia.model.Shop.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.threllia.model.Shop.entities.ApparelProduct;
import org.example.threllia.model.Shop.entities.Product;
import org.example.threllia.model.Shop.repositories.AccessoriesProductRepository;
import org.example.threllia.model.Shop.repositories.ApparelProductRepository;
import org.example.threllia.model.Shop.repositories.MediaProductRepository;
import org.example.threllia.model.Shop.shop_enum.ProductType;
import org.example.threllia.model.Shop.shop_enum.ShopSortingType;
import org.example.threllia.utils.FileUploaderCloud;
import org.example.threllia.utils.ShopParametersTransfer;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @InjectMocks
    private ProductServiceImpl productService;

    @Mock
    private ApparelProductRepository apparelProductRepository;
    @Mock
    private MediaProductRepository mediaProductRepository;
    @Mock
    private AccessoriesProductRepository accessoriesProductRepository;
    @Mock
    private FileUploaderCloud fileUploaderCloud;

    @Test
    void testGetProductsByType_whenAllParametersProvidedWithNoSub_returnPageOfProducts() throws JsonProcessingException {
        ProductType type = ProductType.APPAREL;

        Page<ApparelProduct> products = new PageImpl<>(List.of(new ApparelProduct()), PageRequest.of(0, 6), 6);

        Mockito.when(apparelProductRepository.findAllFilteredNoSubType(
                Mockito.any(String.class),
                Mockito.anyDouble(),
                Mockito.anyDouble(),
                Mockito.any(Pageable.class)))
                        .thenReturn(products);



        //Action

        Page<? extends Product> result =
                productService.getProductsByType(type, new ShopParametersTransfer("1", 0d, 0d, 0, 1, ShopSortingType.ASC_DATE), null);

        //Assert

        Assertions.assertNotNull(result);
        Assertions.assertEquals(products, result);

    }
}
