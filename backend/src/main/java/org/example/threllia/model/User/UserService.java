package org.example.threllia.model.User;

import org.example.threllia.model.User.entities.User;
import org.example.threllia.requests.UserCreationRequest;

public interface UserService {
    void registerUser(UserCreationRequest request) throws Exception;
    String authenticate(UserDTO user);

    UserDTO getUserDetails(String jwt) throws Exception;
    User getUserFromJwt(String jwt) throws Exception;

    String updateUserDetails(String jwt, UserDTO user) throws Exception;

    void changePassword(ChangePasswordDTO request) throws Exception;

    User getCurrentUser();
}
