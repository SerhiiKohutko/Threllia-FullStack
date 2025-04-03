package org.example.threllia.model.Ticket;

import org.example.threllia.model.Payment.Payment;
import org.example.threllia.requests.UpgradePaymentStatusRequest;

public interface TicketService {
    Ticket createTicket(Ticket ticket);

    void savePaymentToTicket(Payment createdPayment, Ticket ticket);

    Ticket updateTicketStatus(UpgradePaymentStatusRequest request) throws Exception;
}
