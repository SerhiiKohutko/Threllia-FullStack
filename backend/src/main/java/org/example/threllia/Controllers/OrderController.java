package org.example.threllia.controllers;

import org.example.threllia.configuration.JWT.JwtProvider;
import org.example.threllia.model.Order.OrderCreationRequest;
import org.example.threllia.model.Order.OrderDTO;
import org.example.threllia.model.Order.OrderService;
import org.example.threllia.model.User.UserService;
import org.example.threllia.model.User.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getOrdersByUser(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.getUserFromJwt(jwt);
        return ResponseEntity.ok(orderService.getOrdersByUserId(user.getId()));
    }

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@RequestHeader("Authorization") String jwt, @RequestBody OrderCreationRequest orderCreationRequest) throws Exception {
        return new ResponseEntity<>(orderService.createOrder(jwt, orderCreationRequest), HttpStatus.CREATED);
    }
}
