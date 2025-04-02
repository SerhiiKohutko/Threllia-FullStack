package org.example.threllia.model.PaymentDetails;

import lombok.Data;

@Data
public class PaymentDetailsDTO {
    private String nameOnTheCard;
    private String cardNumber;
    private CardType type;
    private short expMonth;
    private short expYear;
}
