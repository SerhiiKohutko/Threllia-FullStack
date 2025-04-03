package org.example.threllia.model.Order;

import org.example.threllia.model.Payment.Payment;
import org.example.threllia.requests.UpgradePaymentStatusRequest;

import java.util.List;

public interface OrderService {
    List<OrderDTO> getOrdersByUserId(long id);

    Order createOrder(String jwt, OrderCreationRequest request) throws Exception;

    Order updateOrderStatus(String jwt, UpgradePaymentStatusRequest request) throws Exception;

    void saveOrderPayment(Payment payment, Order order);

}
