package org.example.threllia.model.User;

import org.example.threllia.configuration.JWT.JwtProvider;
import org.example.threllia.configuration.Profile;
import org.example.threllia.model.User.entities.CustomUserDetails;
import org.example.threllia.model.User.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(UserDTO user) throws Exception {
        if (userRepository.findUserByEmail(user.getEmail()).isPresent()){
            throw new Exception("User already registered");
        }

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setRole(user.getRole() == null ? Profile.USER : user.getRole());


        return userRepository.save(newUser);
    }

    @Override
    public String authenticate(UserDTO request) {
        User user = userRepository.findUserByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        CustomUserDetails userDetails = new CustomUserDetails(user.getEmail(), user.getPassword(), user.getRole());
        return JwtProvider.generateToken(userDetails);
    }
}
