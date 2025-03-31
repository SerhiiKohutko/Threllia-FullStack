package org.example.threllia.model.User;

import lombok.Data;
import lombok.ToString;
import org.example.threllia.configuration.Profile;

@Data
@ToString
public class UserDTO {
    private String email;
    private String password;
    private Profile role;
}
