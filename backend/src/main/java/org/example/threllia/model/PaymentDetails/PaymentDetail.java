package org.example.threllia.model.PaymentDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.example.threllia.model.User.entities.User;

@Entity
@Data
@Table(name = "payment_datails_threllia")
public class PaymentDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nameOnTheCard;
    private String cardNumber;
    private CardType type;
    private short expMonth;
    private short expYear;

    @ManyToOne
    @JoinColumn(name = "user")
    @JsonIgnore
    private User user;
}
