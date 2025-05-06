package org.example.threllia.model.User;

import org.apache.http.auth.InvalidCredentialsException;
import org.example.threllia.model.User.entities.User;
import org.example.threllia.requests.UserCreationRequest;

public interface UserService {
    void registerUser(UserCreationRequest request) throws Exception;
    String authenticate(UserDTO user) throws InvalidCredentialsException;

    UserDTO getUserDetails(String jwt) throws Exception;
    User getUserFromJwt(String jwt) throws Exception;

    String updateUserDetails(String jwt, UserDTO user) throws Exception;

    void changePassword(ChangePasswordDTO request) throws Exception;

    User getCurrentUser();
}
