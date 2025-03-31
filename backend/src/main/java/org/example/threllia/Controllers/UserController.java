package org.example.threllia.controllers;

import org.example.threllia.model.User.UserDTO;
import org.example.threllia.model.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<UserDTO> getUserDetails(@RequestHeader("Authorization") String jwt) throws Exception {
        return ResponseEntity.ok(userService.getUserDetails(jwt));
    }

}
