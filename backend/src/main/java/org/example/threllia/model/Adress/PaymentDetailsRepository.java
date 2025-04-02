package org.example.threllia.model.Adress;

import org.example.threllia.model.PaymentDetails.PaymentDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentDetailsRepository extends JpaRepository<PaymentDetail, Long> {

    List<PaymentDetail> getPaymentDetailsByUserId(long userId);
}
