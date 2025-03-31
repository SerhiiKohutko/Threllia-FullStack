package org.example.threllia.model.Order;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderDTO {

    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateOrdered;

    private OrderStatus status;
    private double totalCost;
    List<OrderItem> orderItems;
}
