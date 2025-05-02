package org.example.threllia.controllers;

import org.example.threllia.configuration.Configuration;
import org.example.threllia.model.Shop.dto.ProductDTO;
import org.example.threllia.model.Shop.service.ProductService;
import org.example.threllia.utils.FileUploaderCloud;
import org.example.threllia.utils.ShopParametersTransfer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ShopController.class)
@AutoConfigureMockMvc
@Import(Configuration.class)
public class ShopControllerGetAllProductsPaginatedTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductService productService;
    @MockitoBean
    private FileUploaderCloud fileUploaderCloud;

    private ProductDTO productDTO;

    private Page<ProductDTO> mockPage;

    @BeforeEach
    void setup(){
        productDTO = new ProductDTO();
        productDTO.setName("test_product");
        productDTO.setPrice(100d);

        mockPage = new PageImpl<>(List.of(productDTO)); //mock page
    }

    @Test
    void testGetAllProducts_returnPageOfProducts() throws Exception {

        Mockito.when(productService.getAllProductsPaginated(Mockito.any(ShopParametersTransfer.class)))
                .thenReturn(mockPage);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/products/all_paginated"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content[0].name").value(productDTO.getName()));

    }

    @Test
    void testGetAllProducts_whenInvalidSortingTypeProvided_returnBadRequest400() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/api/products/all_paginated")
                        .param("shopSortingType", "INVALID_VALUE"))
                .andExpect(status().isBadRequest());

    }

    @Test
    @DisplayName("Get All Products Paginated With Custom Parameters")
    void testGetAllProducts_whenCustomParametersProvided_returnPage() throws Exception {

        Mockito.when(productService.getAllProductsPaginated(Mockito.any(ShopParametersTransfer.class)))
                .thenReturn(mockPage);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/products/all_paginated")
                .param("page", "1")
                .param("size", "6")
                .param("minPrice", "50"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content[0].name").value(productDTO.getName()));

    }

    @Test
    void testGetAllProducts_whenNoProductMatch_returnEmptyPage() throws Exception {

        Mockito.when(productService.getAllProductsPaginated(Mockito.any(ShopParametersTransfer.class)))
                .thenReturn(Page.empty());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/products/all_paginated")
                        .param("shopSortingType", "ASC_DATE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content").isEmpty());

    }
}
