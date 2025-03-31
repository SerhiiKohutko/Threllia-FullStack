package org.example.threllia.model.Order;

import java.util.List;

public interface OrderService {
    List<OrderDTO> getOrdersByUserId(long id);

    OrderDTO createOrder(String jwt, OrderCreationRequest request) throws Exception;
}
