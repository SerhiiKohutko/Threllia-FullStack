package org.example.threllia.model.Ticket;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.example.threllia.model.Payment.Payment;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@Entity
@Data
@Table(name = "concert_tickets")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private TicketStatus ticketStatus = TicketStatus.RESERVED;
    private String clientEmail;
    private String city;
    private String country;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private String place;
    private int quantity;
    private double amount;

    @OneToOne
    private Payment payment;

    public String getFormattedDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("EEEE, MMMM d, yyyy 'at' h:mm a", Locale.ENGLISH);
        return sdf.format(date);
    }
}
