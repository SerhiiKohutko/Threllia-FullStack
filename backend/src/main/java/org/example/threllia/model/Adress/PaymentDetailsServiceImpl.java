package org.example.threllia.model.Adress;

import org.example.threllia.model.PaymentDetails.PaymentDetail;
import org.example.threllia.model.User.UserService;
import org.example.threllia.model.User.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService{

    @Autowired
    private UserService userService;
    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;

    @Override
    public PaymentDetail createPaymentDetails(PaymentDetailsDTO paymentDetailsDTO) {

        User user = userService.getCurrentUser();

        PaymentDetail paymentDetail = new PaymentDetail();

        paymentDetail.setType(paymentDetailsDTO.getType());
        paymentDetail.setExpMonth(paymentDetailsDTO.getExpMonth());
        paymentDetail.setExpYear(paymentDetailsDTO.getExpYear());
        paymentDetail.setCardNumber(paymentDetailsDTO.getCardNumber());
        paymentDetail.setNameOnTheCard(paymentDetailsDTO.getNameOnTheCard());
        paymentDetail.setUser(user);

        return paymentDetailsRepository.save(paymentDetail);
    }

    @Override
    public PaymentDetail getPaymentDetailsById(long paymentDetailId) {
        return paymentDetailsRepository.findById(paymentDetailId).get();
    }

    @Override
    public List<PaymentDetail> getPaymentDetailsByUser() {
        return paymentDetailsRepository.getPaymentDetailsByUserId(userService.getCurrentUser().getId());
    }

    @Override
    public PaymentDetailsDTO updatePaymentDetails(long paymentDetailsId, PaymentDetailsDTO details) {
        PaymentDetail updatedPaymentDetails = getPaymentDetailsById(paymentDetailsId);

        updatedPaymentDetails.setType(details.getType());
        updatedPaymentDetails.setExpMonth(details.getExpMonth());
        updatedPaymentDetails.setExpYear(details.getExpYear());
        updatedPaymentDetails.setCardNumber(details.getCardNumber());
        updatedPaymentDetails.setNameOnTheCard(details.getNameOnTheCard());

        paymentDetailsRepository.save(updatedPaymentDetails);

        return details;
    }

    @Override
    public void deletePaymentDetails(long paymentDetailsId) {
        paymentDetailsRepository.deleteById(paymentDetailsId);
    }
}
