package org.example.threllia.controllers;

import org.example.threllia.model.Adress.PaymentDetailsDTO;
import org.example.threllia.model.Adress.PaymentDetailsService;
import org.example.threllia.model.PaymentDetails.PaymentDetail;
import org.example.threllia.responses.DeletionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment_details")
public class PaymentDetailsController {

    @Autowired
    private PaymentDetailsService paymentDetailsService;

    @PostMapping
    public ResponseEntity<PaymentDetail> createPaymentDetails(@RequestBody PaymentDetailsDTO paymentDetailsDTO){
        return new ResponseEntity<>(paymentDetailsService.createPaymentDetails(paymentDetailsDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PaymentDetail>> getPaymentDetails(){
        return ResponseEntity.ok(paymentDetailsService.getPaymentDetailsByUser());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<PaymentDetailsDTO> updatePaymentDetails(@PathVariable long id, @RequestBody PaymentDetailsDTO paymentDetailsDTO){
        return ResponseEntity.ok(paymentDetailsService.updatePaymentDetails(id, paymentDetailsDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeletionResponse> deletePaymentDetails(@PathVariable long id){
        paymentDetailsService.deletePaymentDetails(id);
        return ResponseEntity.ok(new DeletionResponse("Deleted Successfully!"));
    }
 }
