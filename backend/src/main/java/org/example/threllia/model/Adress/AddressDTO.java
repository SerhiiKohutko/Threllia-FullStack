package org.example.threllia.model.Adress;

import lombok.Data;

@Data
public class AddressDTO {
    private String addressName;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private int zipCode;
    private String country;
    private String state;
    private String number;
}
