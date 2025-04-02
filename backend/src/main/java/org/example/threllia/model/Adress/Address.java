package org.example.threllia.model.Adress;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.example.threllia.model.User.entities.User;

@Entity
@Data
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String addressName;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private int zipCode;
    private String country;
    private String state;
    private String number;

    @ManyToOne
    @JoinColumn(name = "user")
    @JsonIgnore
    private User user;
}
