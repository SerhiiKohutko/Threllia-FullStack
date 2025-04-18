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
@RequestMapping("/api/user/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping
    public ResponseEntity<Address> createAddress(@RequestBody AddressDTO addressDTO){
        return new ResponseEntity<>(addressService.createAddress(addressDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Address>> getAddresses(){
        return ResponseEntity.ok(addressService.getAddressesByUser());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Address> getAddressDetails(@PathVariable long id){
        return ResponseEntity.ok(addressService.getAddressById(id));
    }


    @PatchMapping("/{id}")
    public ResponseEntity<AddressDTO> updateAddress(@PathVariable long id, @RequestBody AddressDTO addressDTO){
        return ResponseEntity.ok(addressService.updateAddress(id, addressDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeletionResponse> deleteAddress(@PathVariable long id){
        addressService.deleteAddress(id);
        return ResponseEntity.ok(new DeletionResponse("Deleted Successfully!"));
    }



}
