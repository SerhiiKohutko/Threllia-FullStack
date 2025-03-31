package org.example.threllia.model.User;

import org.example.threllia.requests.UserCreationRequest;

public interface UserService {
    void registerUser(UserCreationRequest request) throws Exception;
    String authenticate(UserDTO user);
}
