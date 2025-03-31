package org.example.threllia.model.Payment;

public interface PaymentService {
    boolean isPaymentSucceed(String paymentId) throws Exception;
    Payment createPayment(String paymentId, PaymentStatus status);
}
