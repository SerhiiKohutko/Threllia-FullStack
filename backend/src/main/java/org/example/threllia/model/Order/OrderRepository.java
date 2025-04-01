package org.example.threllia.model.Order;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @EntityGraph(attributePaths = {"orderItems"})
    List<Order> getAllByUserId(long id);

    Optional<Order> findOrderById(long orderId);
}
