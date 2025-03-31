package org.example.threllia.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
public class UserCreationRequest {

    private String email;
    private String password;
    private String firstName;
    private String lastName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateOfBirth;

    private String country;
}
