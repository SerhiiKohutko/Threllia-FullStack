package org.example.threllia.controllers;

import org.example.threllia.model.Ticket.Ticket;
import org.example.threllia.model.Ticket.TicketService;
import org.example.threllia.requests.UpgradePaymentStatusRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/update")
    public ResponseEntity<Ticket> updateTicketStatusAfterPayment(@RequestBody UpgradePaymentStatusRequest request) throws Exception {
        return ResponseEntity.ok(ticketService.updateTicketStatus(request));
    }
}
