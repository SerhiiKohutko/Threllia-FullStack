package org.example.threllia.model.Order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.example.threllia.model.Payment.Payment;
import org.example.threllia.model.User.entities.User;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "orders_threllia")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateOrdered;

    private OrderStatus status;
    private double totalCost;

    @ManyToOne
    @JoinColumn(name = "user_id",  referencedColumnName = "id")
    @JsonIgnore
    private User user;


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;

    @OneToOne
    private Payment payment;
}
