package org.example.threllia.model.User;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;
import org.example.threllia.model.User.entities.User;

import java.util.Date;

@Data
@ToString
public class UserDTO {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateOfBirth;
    private String country;

    public static UserDTO mapToUserDto(User user){
        UserDTO userDTO = new UserDTO();

        userDTO.setEmail(user.getEmail());
        userDTO.setCountry(user.getCountry());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setDateOfBirth(user.getDateOfBirth());

        return userDTO;
    }
}
