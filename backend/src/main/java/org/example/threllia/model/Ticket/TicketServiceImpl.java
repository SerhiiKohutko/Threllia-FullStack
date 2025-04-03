package org.example.threllia.model.Ticket;

import com.stripe.model.checkout.Session;
import org.example.threllia.model.Payment.Payment;
import org.example.threllia.model.Payment.PaymentService;
import org.example.threllia.requests.UpgradePaymentStatusRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketServiceImpl implements TicketService{

    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private EmailService emailService;

    @Override
    public Ticket createTicket(Ticket ticket) {
        Ticket newTicket = new Ticket();

        newTicket.setCity(ticket.getCity());
        newTicket.setDate(ticket.getDate());
        newTicket.setQuantity(ticket.getQuantity());
        newTicket.setPlace(ticket.getPlace());
        newTicket.setCountry(ticket.getCountry());
        newTicket.setAmount(ticket.getAmount());
        newTicket.setClientEmail(ticket.getClientEmail());

        return ticketRepository.save(newTicket);
    }

    @Override
    public void savePaymentToTicket(Payment createdPayment, Ticket ticket) {
     ticket.setPayment(createdPayment);
     ticketRepository.save(ticket);
    }

    @Override
    public Ticket updateTicketStatus(UpgradePaymentStatusRequest request) throws Exception {
        Session session = Session.retrieve(request.getPaymentId());
        long ticketId = Long.parseLong(session.getMetadata().get("ticket_id"));

        Ticket ticket = ticketRepository.findById(ticketId).get();

        if (!ticket.getTicketStatus().equals(TicketStatus.RESERVED)){
            return null;
        }

        if (paymentService.isPaymentSucceed(request.getPaymentId())){
            ticket.setTicketStatus(TicketStatus.PAID);
            emailService.sendTicketConfirmation(ticket.getClientEmail(), String.valueOf(ticket.getId()), ticket);
        }else {
            ticket.setTicketStatus(TicketStatus.CANCELED);
            emailService.sendTicketCancel(ticket.getClientEmail(), String.valueOf(ticket.getId()), ticket);
        }

        return ticketRepository.save(ticket);
    }


}
