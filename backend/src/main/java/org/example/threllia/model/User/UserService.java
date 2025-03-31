package org.example.threllia.model.User;

import org.example.threllia.model.User.entities.User;

public interface UserService {
    User registerUser(UserDTO user) throws Exception;
    String authenticate(UserDTO user);
}
