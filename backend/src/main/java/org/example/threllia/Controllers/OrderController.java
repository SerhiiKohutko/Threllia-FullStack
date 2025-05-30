package org.example.threllia.controllers;

import org.example.threllia.configuration.JWT.JwtProvider;
import org.example.threllia.model.Order.Order;
import org.example.threllia.model.Order.OrderDTO;
import org.example.threllia.model.Order.OrderService;
import org.example.threllia.model.User.UserService;
import org.example.threllia.model.User.entities.User;
import org.example.threllia.requests.UpgradePaymentStatusRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/orders")
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

    @PostMapping("/update_order_status")
    public ResponseEntity<Order> updateOrder(@RequestHeader("Authorization") String jwt, @RequestBody UpgradePaymentStatusRequest request) throws Exception {
        return ResponseEntity.ok(orderService.updateOrderStatus(jwt, request));
    }

}
