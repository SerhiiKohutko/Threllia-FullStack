package org.example.threllia.controllers;

import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.example.threllia.model.Order.Order;
import org.example.threllia.model.Order.OrderCreationRequest;
import org.example.threllia.model.Order.OrderItem;
import org.example.threllia.model.Order.OrderService;
import org.example.threllia.model.Payment.Payment;
import org.example.threllia.model.Payment.PaymentService;
import org.example.threllia.model.Payment.PaymentStatus;
import org.example.threllia.model.Ticket.Ticket;
import org.example.threllia.model.Ticket.TicketService;
import org.example.threllia.responses.PaymentLinkResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private TicketService ticketService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @PostMapping("/buy_ticket")
    public ResponseEntity<PaymentLinkResponse> createPaymentForTicket(@RequestBody Ticket ticket) {
        ticket = ticketService.createTicket(ticket);
        try {
            SessionCreateParams params = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(frontendUrl + "/ticket/success?payment_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(frontendUrl + "/ticket/cancel?&payment_id={CHECKOUT_SESSION_ID}")
                    .putMetadata("ticket_id", String.valueOf(ticket.getId()))
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity((long) (ticket.getQuantity()))
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("usd")
                                                    .setUnitAmount((long) ((ticket.getAmount() * 100) / ticket.getQuantity()))
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName(ticket.getCity() + ", " + ticket.getPlace() + " ticket")
                                                                    .build()
                                                    )
                                                    .build()
                                    )
                                    .build()
                    )
                    .build();

            Session session = Session.create(params);

            PaymentLinkResponse response = new PaymentLinkResponse();
            response.setPayment_link_url(session.getUrl());
            response.setPayment_link_id(session.getId());

            Payment createdPayment = paymentService.createPayment(session.getId(), PaymentStatus.PENDING);

            ticketService.savePaymentToTicket(createdPayment, ticket);

            return ResponseEntity.ok(response);

         } catch (Exception e) {
            throw new RuntimeException("Ошибка при создании сессии оплаты", e);
        }
    }

    @PostMapping
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @RequestBody OrderCreationRequest request,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        Order order = orderService.createOrder(jwt ,request);

        try {

            List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();

            for (OrderItem item : request.getProducts()) {
                lineItems.add(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity((long) item.getQuantity())
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("usd")
                                                .setUnitAmount((long) (item.getPrice() * 100))
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName(item.getProductName())
                                                                .build()
                                                )
                                                .build()
                                )
                                .build()
                );
            }

            SessionCreateParams params = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(frontendUrl + "/order/success?&payment_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(frontendUrl + "/order/cancel?&payment_id={CHECKOUT_SESSION_ID}")
                    .addAllLineItem(lineItems)
                    .putMetadata("order_id", String.valueOf(order.getId()))
                    .build();

            Session session = Session.create(params);

            PaymentLinkResponse response = new PaymentLinkResponse();
            response.setPayment_link_url(session.getUrl());
            response.setPayment_link_id(session.getId());

            Payment createdPayment = paymentService.createPayment(session.getId(), PaymentStatus.PENDING);
            orderService.saveOrderPayment(createdPayment, order);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            throw new RuntimeException("Ошибка при создании сессии оплаты", e);
        }
    }
}