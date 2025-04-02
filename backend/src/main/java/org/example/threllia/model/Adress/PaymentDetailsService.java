package org.example.threllia.model.Adress;

import org.example.threllia.model.PaymentDetails.PaymentDetail;

import java.util.List;

public interface PaymentDetailsService {
    PaymentDetail createPaymentDetails(PaymentDetailsDTO paymentDetailsDTO);
    PaymentDetail getPaymentDetailsById(long paymentDetailId);
    List<PaymentDetail> getPaymentDetailsByUser();
    PaymentDetailsDTO updatePaymentDetails(long paymentDetailsId, PaymentDetailsDTO details);
    void deletePaymentDetails(long paymentDetailsId);
}
