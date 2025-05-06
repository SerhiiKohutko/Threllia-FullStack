package org.example.threllia.integration;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.example.threllia.model.User.UserDTO;
import org.example.threllia.requests.UserCreationRequest;
import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("test")
public class UserCreationIntegrationTest {

    @LocalServerPort
    private int port;


    private final String USERNAME = "test@gmail.com";
    private final String PASSWORD = "test_password";

    @BeforeAll
    void setup(){
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = port;
    }

    @Test
    @Order(1)
    void testRegisterUser_returnAuthResponse(){

        //Arrange
        UserCreationRequest request = new UserCreationRequest();
        request.setEmail(USERNAME);
        request.setPassword(PASSWORD);
        request.setFirstName("Jack");
        request.setLastName("Morris");

        //Act && Assert

        given().contentType(ContentType.JSON)
                .body(request)
                .when().post("auth/register")
                .then().statusCode(201)
                .body("message", equalTo("User successfully registered!"));

    }

    @Test
    @Order(2)
    void testLoginUser_returnJwt(){
        UserDTO user = new UserDTO();
        user.setEmail(USERNAME);
        user.setPassword(PASSWORD);

        given().contentType(ContentType.JSON)
                .body(user)
                .when().post("/auth/login")
                .then()
                .statusCode(200)
                .body(notNullValue());
    }


    @Test
    @Order(3)
    @DisplayName("Login with unregistered username")
    void testLoginUser_whenNotRegisteredEmailProvided_return404(){
        UserDTO user = new UserDTO();
        user.setEmail("not_registered_email@gmail.com");


        given().contentType(ContentType.JSON)
                .body(user)
                .when().post("/auth/login")
                .then()
                .statusCode(404)
                .body("message", equalTo("User not found"));
    }

    @Test
    @Order(4)
    @DisplayName("Fail login with invalid password")
    void testLoginUser_whenInvalidPasswordProvided_return404(){
        UserDTO user = new UserDTO();
        user.setEmail(USERNAME);
        user.setPassword("invalid_password");


        given().contentType(ContentType.JSON)
                .body(user)
                .when().post("/auth/login")
                .then()
                .statusCode(404)
                .body("message", equalTo("Invalid credentials"));
    }

    @Test
    @Order(5)
    @DisplayName("Register with email that already is use")
    void testRegisterUser_whenEmailInUseProvided_return400(){
        UserCreationRequest request = new UserCreationRequest();
        request.setEmail(USERNAME);
        request.setPassword(PASSWORD);

        given().contentType(ContentType.JSON)
                .body(request)
                .when().post("auth/register")
                .then().statusCode(500);
    }
}
