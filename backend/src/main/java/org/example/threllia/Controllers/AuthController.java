package org.example.threllia.controllers;

import org.example.threllia.model.User.UserDTO;
import org.example.threllia.model.User.UserService;
import org.example.threllia.model.User.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String login(@RequestBody UserDTO user){
        return userService.authenticate(user);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody(required = false) UserDTO user) throws Exception {

        System.out.println(user);
        User registeredUser = userService.registerUser(user);

        return ResponseEntity.ok(registeredUser);
    }
}
