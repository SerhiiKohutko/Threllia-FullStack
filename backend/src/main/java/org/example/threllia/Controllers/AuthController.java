package org.example.threllia.controllers;

import org.apache.http.auth.InvalidCredentialsException;
import org.example.threllia.model.User.UserDTO;
import org.example.threllia.model.User.UserService;
import org.example.threllia.requests.UserCreationRequest;
import org.example.threllia.responses.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO user) throws InvalidCredentialsException {
        System.out.println(user.toString());
        return ResponseEntity.ok(userService.authenticate(user));
    }

    @PostMapping(path = "/register")
    public ResponseEntity<AuthResponse> register(@RequestBody UserCreationRequest request) throws Exception {
        userService.registerUser(request);
        return new ResponseEntity<>(new AuthResponse("User successfully registered!"), HttpStatus.CREATED);
    }
}
