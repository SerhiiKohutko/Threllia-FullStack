package org.example.threllia.model.User.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import org.example.threllia.configuration.Profile;

import java.util.Date;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String email;
    private String password;
    private Profile role;

    private String firstName;
    private String lastName;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateOfBirth;
    private String country;
}
