package org.example.threllia.model.Order;

import com.stripe.model.checkout.Session;
import jakarta.transaction.Transactional;
import org.example.threllia.model.Payment.Payment;
import org.example.threllia.model.Payment.PaymentService;
import org.example.threllia.model.User.UserService;
import org.example.threllia.model.User.entities.User;
import org.example.threllia.requests.UpgradeOrderStatusRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private PaymentService paymentService;

    @Override
    @Transactional
    public List<OrderDTO> getOrdersByUserId(long id) {
        List<Order> orders = orderRepository.getAllByUserId(id);

        orders.forEach(order -> order.getOrderItems().size());

        return orders.stream().map(this::mapToOrderDTO).toList();
    }

    private OrderDTO mapToOrderDTO(Order order){
        OrderDTO orderDTO = new OrderDTO();

        orderDTO.setDateOrdered(order.getDateOrdered());
        orderDTO.setId(order.getId());
        orderDTO.setTotalCost(order.getTotalCost());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setOrderItems(order.getOrderItems());

        return orderDTO;
    }

    @Override
    public Order createOrder(String jwt, OrderCreationRequest request) throws Exception {
        User user = userService.getUserFromJwt(jwt);

        Order order = new Order();
        order.setTotalCost(request.getTotalCost());
        order.setDateOrdered(new Date());
        order.setStatus(OrderStatus.PROGRESS);
        order.setUser(user);

        order = orderRepository.save(order);

        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItem orderItem : request.getProducts()) {
            orderItem.setOrder(order);
            orderItems.add(orderItem);
        }

        order.setOrderItems(orderItems);


        return order;
    }

    @Override
    public Order updateOrderStatus(String jwt, UpgradeOrderStatusRequest request) throws Exception {
        Session session = Session.retrieve(request.getPaymentId());
        long orderId = Long.parseLong(session.getMetadata().get("order_id"));

        Order order = orderRepository.findOrderById(orderId).orElseThrow(() -> new Exception("No order found with such id"));

        if (paymentService.isPaymentSucceed(request.getPaymentId())){
            order.setStatus(OrderStatus.SUCCESS);
        } else {
            order.setStatus(OrderStatus.FAILED);
        }

        return orderRepository.save(order);
    }

    @Override
    public void saveOrderPayment(Payment payment, Order order) {
        order.setPayment(payment);
        orderRepository.save(order);
    }

}
