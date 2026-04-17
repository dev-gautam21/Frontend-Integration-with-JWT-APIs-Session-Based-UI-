package com.acme.authservice.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LocalUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("dev".equals(username) || "dev@atelier.com".equals(username)) {
            return User.builder()
                    .username("dev")
                    .password("{noop}pass123")
                    .roles("USER")
                    .build();
        }
        if ("admin".equals(username) || "admin@atelier.com".equals(username)) {
            return User.builder()
                    .username("admin")
                    .password("{noop}pass123")
                    .roles("ADMIN")
                    .build();
        }
        throw new UsernameNotFoundException("User not found");
    }
}