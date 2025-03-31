package org.example.threllia.model.Payment;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "payment_threllia")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String paymentId;
    private PaymentStatus paymentStatus;
}
