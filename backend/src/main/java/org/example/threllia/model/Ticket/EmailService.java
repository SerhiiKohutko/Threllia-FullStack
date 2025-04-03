package org.example.threllia.model.Ticket;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendTicketConfirmation(String userEmail, String ticketId, Ticket ticketDetails) throws MessagingException;
    void sendTicketCancel(String userEmail, String ticketId, Ticket ticketDetails) throws MessagingException;
}
