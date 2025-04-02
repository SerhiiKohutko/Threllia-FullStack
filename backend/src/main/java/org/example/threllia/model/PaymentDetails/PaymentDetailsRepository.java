package org.example.threllia.model.PaymentDetails;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentDetailsRepository extends JpaRepository<PaymentDetail, Long> {

    List<PaymentDetail> getPaymentDetailsByUserId(long userId);
}
