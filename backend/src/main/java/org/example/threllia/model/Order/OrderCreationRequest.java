package org.example.threllia.model.Order;

import lombok.Data;

import java.util.List;

@Data
public class OrderCreationRequest {
    double totalCost;
    List<OrderItem> products;
}