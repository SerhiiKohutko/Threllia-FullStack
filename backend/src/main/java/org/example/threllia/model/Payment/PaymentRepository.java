package org.example.threllia.model.Payment;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<org.example.threllia.model.Payment.Payment, Long> {
    Optional<Payment> findByPaymentId(String paymentId);
}
