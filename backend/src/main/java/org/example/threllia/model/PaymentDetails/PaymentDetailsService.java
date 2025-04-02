package org.example.threllia.model.PaymentDetails;

import java.util.List;

public interface PaymentDetailsService {
    PaymentDetail createPaymentDetails(PaymentDetailsDTO paymentDetailsDTO);
    PaymentDetail getPaymentDetailsById(long paymentDetailId);
    List<PaymentDetail> getPaymentDetailsByUser();
    PaymentDetailsDTO updatePaymentDetails(long paymentDetailsId, PaymentDetailsDTO details);
    void deletePaymentDetails(long paymentDetailsId);
}
