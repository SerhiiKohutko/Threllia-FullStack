package org.example.threllia.model.Payment;

import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService{
    @Autowired
    private PaymentRepository paymentRepository;
    @Override
    public boolean isPaymentSucceed(String paymentId) throws Exception {
        Optional<Payment> payment = paymentRepository.findByPaymentId(paymentId);

        if (payment.isEmpty()) {
            throw new Exception("Payment id not found");
        }

        Session session = Session.retrieve(paymentId);

        if ("paid".equals(session.getPaymentStatus())) {
            Payment existingPayment = payment.get();
            existingPayment.setPaymentStatus(PaymentStatus.SUCCESS);
            paymentRepository.save(existingPayment);
            return true;
        } else {
            Payment existingPayment = payment.get();
            existingPayment.setPaymentStatus(PaymentStatus.FAILED);
            paymentRepository.save(existingPayment);
            return false;
        }

    }

    @Override
    public Payment createPayment(String paymentId, PaymentStatus status) {
        Payment payment = new Payment();
        payment.setPaymentStatus(status);
        payment.setPaymentId(paymentId);
        return paymentRepository.save(payment);
    }
}
