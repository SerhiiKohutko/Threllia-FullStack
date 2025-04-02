package org.example.threllia.controllers;

import org.example.threllia.model.Adress.Address;
import org.example.threllia.model.Adress.AddressDTO;
import org.example.threllia.model.Adress.AddressService;
import org.example.threllia.responses.DeletionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping
    public ResponseEntity<Address> createAddress(@RequestBody AddressDTO addressDTO){
        return new ResponseEntity<>(addressService.createAddress(addressDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Address>> getPaymentDetails(){
        return ResponseEntity.ok(addressService.getAddressesByUser());
    }


    @PatchMapping("/{id}")
    public ResponseEntity<AddressDTO> updatePaymentDetails(@PathVariable long id, @RequestBody AddressDTO addressDTO){
        return ResponseEntity.ok(addressService.updateAddress(id, addressDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeletionResponse> deletePaymentDetails(@PathVariable long id){
        addressService.deleteAddress(id);
        return ResponseEntity.ok(new DeletionResponse("Deleted Successfully!"));
    }



}
