package org.example.threllia.model.User;

import org.example.threllia.model.User.entities.CustomUserDetails;
import org.example.threllia.model.User.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByEmail(username).
                orElseThrow(() -> new UsernameNotFoundException("No User with such email found " + username));

        return new CustomUserDetails(user.getEmail(), user.getPassword(), user.getRole());
    }
}
