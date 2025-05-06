package org.example.threllia.model.User;

import org.apache.http.auth.InvalidCredentialsException;
import org.example.threllia.configuration.JWT.JwtProvider;
import org.example.threllia.configuration.Profile;
import org.example.threllia.model.User.entities.CustomUserDetails;
import org.example.threllia.model.User.entities.User;
import org.example.threllia.requests.UserCreationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private CustomUserDetailsService customUserDetails;

    @Override
    public void registerUser(UserCreationRequest request) throws Exception {
        if (userRepository.findUserByEmail(request.getEmail()).isPresent()){
            throw new Exception("User already registered");
        }

        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setCountry(request.getCountry());
        newUser.setDateOfBirth(request.getDateOfBirth());
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setRole(Profile.USER);

       userRepository.save(newUser);
    }

    @Override
    public String authenticate(UserDTO request) throws InvalidCredentialsException {
        User user = userRepository.findUserByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        CustomUserDetails userDetails = new CustomUserDetails(user.getEmail(), user.getPassword(), user.getRole());
        return JwtProvider.generateToken(userDetails);
    }

    @Override
    public UserDTO getUserDetails(String jwt) throws Exception {
        String email = jwtProvider.getUsernameFromToken(jwt);
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new Exception("Error while getting user details with email " + email));
        return UserDTO.mapToUserDto(user);
    }

    @Override
    public User getUserFromJwt(String jwt) throws Exception {
        String email = jwtProvider.getUsernameFromToken(jwt);
        return userRepository.findUserByEmail(email).orElseThrow(() -> new Exception("Error while getting user details with email " + email));
    }

    @Override
    public String updateUserDetails(String jwt, UserDTO user) throws Exception {
        User updatedUser = getUserFromJwt(jwt);

        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setEmail(user.getEmail());
        updatedUser.setCountry(user.getCountry());
        updatedUser.setDateOfBirth(user.getDateOfBirth());
        userRepository.save(updatedUser);

        return JwtProvider.generateToken(new CustomUserDetails(updatedUser.getEmail(), null, updatedUser.getRole()));
    }

    @Override
    public void changePassword(ChangePasswordDTO request) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        UserDetails userDetails = customUserDetails.loadUserByUsername(username);

        if (!passwordEncoder.matches(request.getOldPassword(), userDetails.getPassword())) {
            throw new Exception("Old password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new Exception("New password and confirmation do not match");
        }

        User user = userRepository.findUserByEmail(username).get();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findUserByEmail(email).get();
    }


}
