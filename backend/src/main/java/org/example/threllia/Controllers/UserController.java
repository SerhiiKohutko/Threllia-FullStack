package org.example.threllia.controllers;

import org.example.threllia.model.User.ChangePasswordDTO;
import org.example.threllia.model.User.UserDTO;
import org.example.threllia.model.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<UserDTO> getUserDetails(@RequestHeader("Authorization") String jwt) throws Exception {
        return ResponseEntity.ok(userService.getUserDetails(jwt));
    }

    @PatchMapping
    public ResponseEntity<String> updateUserDetails(@RequestHeader("Authorization") String jwt, @RequestBody UserDTO user) throws Exception{
        return ResponseEntity.ok(userService.updateUserDetails(jwt, user));
    }

    @PatchMapping("/change_password")
    public ResponseEntity<UserDTO> updatePassword(@RequestBody ChangePasswordDTO request) throws Exception {
        userService.changePassword(request);
        return null;
    }

}
