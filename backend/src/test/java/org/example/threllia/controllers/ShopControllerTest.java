package org.example.threllia.controllers;

import org.example.threllia.configuration.Configuration;
import org.example.threllia.model.Shop.entities.MediaProduct;
import org.example.threllia.model.Shop.service.ProductService;
import org.example.threllia.model.Shop.shop_enum.MediaProductType;
import org.example.threllia.model.Shop.shop_enum.ProductType;
import org.example.threllia.utils.FileUploaderCloud;
import org.example.threllia.utils.ShopParametersTransfer;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;
import java.util.stream.Stream;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;

@WebMvcTest(ShopController.class)
@AutoConfigureMockMvc
@Import(Configuration.class)
public class ShopControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductService productService;

    @MockitoBean
    private FileUploaderCloud fileUploaderCloud;


    @BeforeEach
    void setup(){

    }


    @Test
    void testGetProductByType_whenMediaTypeProvided_returnMediaProducts() throws Exception {

        List<MediaProduct> mediaProducts = Stream
                .generate(MediaProduct::new)
                .limit(10)
                .toList();

        mediaProducts.forEach(e -> e.setType(MediaProductType.CD));

        Page<MediaProduct> productPage = new PageImpl<>(mediaProducts.subList(0, 6), PageRequest.of(0, 6), mediaProducts.size());

        Mockito.when(productService.getProductsByType(
                        eq(ProductType.MEDIA),
                        Mockito.any(ShopParametersTransfer.class),
                        isNull()))
                .thenReturn((Page) productPage);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/products/MEDIA")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content", Matchers.hasSize(6)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.totalElements").value(10))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].type").value("CD"));

    }

}
