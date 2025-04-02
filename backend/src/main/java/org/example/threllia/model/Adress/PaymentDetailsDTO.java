package org.example.threllia.model.Adress;

import lombok.Data;
import org.example.threllia.model.PaymentDetails.CardType;

@Data
public class PaymentDetailsDTO {
    private String nameOnTheCard;
    private String cardNumber;
    private CardType type;
    private short expMonth;
    private short expYear;
}
