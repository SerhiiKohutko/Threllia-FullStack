package org.example.threllia.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.example.threllia.configuration.Configuration;
import org.example.threllia.model.Shop.entities.Product;
import org.example.threllia.model.Shop.repositories.AccessoriesProductRepository;
import org.example.threllia.model.Shop.repositories.ApparelProductRepository;
import org.example.threllia.model.Shop.repositories.MediaProductRepository;
import org.example.threllia.model.Shop.service.ProductService;
import org.example.threllia.model.Shop.shop_enum.MediaProductType;
import org.example.threllia.model.Shop.shop_enum.ProductType;
import org.example.threllia.requests.ProductRequest;
import org.example.threllia.utils.FileUploaderCloud;
import org.junit.jupiter.api.*;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDate;
import java.util.Arrays;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_METHOD)
@Import(Configuration.class)
@ActiveProfiles("test")
public class ProductServiceIntegrationTest {

    @Autowired
    private ProductService productService;

    @Autowired
    private ApparelProductRepository apparelProductRepository;
    @Autowired
    private MediaProductRepository mediaProductRepository;
    @Autowired
    private AccessoriesProductRepository accessoriesProductRepository;

    @MockitoBean
    private FileUploaderCloud fileUploaderCloud;

    @Autowired
    private ObjectMapper objectMapper;

    @LocalServerPort
    private  int port;

    String imageName;
    ProductRequest productRequest;

    @BeforeEach
    void setupForAll(){
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = port;
    }

    @BeforeEach
    void setup(){
        imageName = "test";
        productRequest = new ProductRequest();

        productRequest.setId(1L);
        productRequest.setName("Product A");
        productRequest.setDateAdded(LocalDate.now());
        productRequest.setImageUrl("http://example.com/image.jpg");
        productRequest.setPrice(29.99);
        productRequest.setDescription("This is a great product.");
        productRequest.setTotalQuantity(100);

        productRequest.setType(ProductType.MEDIA);
        productRequest.setMediaProductType(MediaProductType.DVD);
    }

    @Test
    void testCreateProduct_whenValidParametersProvided_returnProduct() throws Exception {

        //Action

        Product result =
                productService.createProduct(productRequest, imageName);

        //Assert

        Assertions.assertNotNull(result);
        Assertions.assertEquals(result.getName(), productRequest.getName());
        Assertions.assertEquals(29.99, result.getPrice());
        Assertions.assertEquals(100, result.getTotalQuantity());
    }

    @Test
    @DisplayName("Create Product with Rest Assured")
    void testCreateProductRestAssured_whenValidParametersProvided_returnProduct() throws Exception {

        // Arrange
        String data = objectMapper.writeValueAsString(productRequest);

        // Create a temporary file for testing
        File imageFile = File.createTempFile("test-image", ".jpg");

        Mockito.when(fileUploaderCloud.uploadImage(Mockito.any(MultipartFile.class)))
                .thenReturn(imageFile.getName());

        try {
            try (FileOutputStream fos = new FileOutputStream(imageFile)) {
                byte[] dummyImageContent = new byte[100]; // Just some dummy content
                Arrays.fill(dummyImageContent, (byte) 0xFF);
                fos.write(dummyImageContent);
            }

            // Action & Assert
            given()
                    .contentType(ContentType.MULTIPART)
                    .multiPart("data", data)
                    .multiPart("coverImage", imageFile, "image/jpeg")
                    .when()
                    .post("api/products")
                    .then()
                    .statusCode(200)
                    .body("name", equalTo(productRequest.getName()))
                    .body("imageUrl", equalTo(imageFile.getName()));
        } finally {
            imageFile.delete();
        }
    }
}
