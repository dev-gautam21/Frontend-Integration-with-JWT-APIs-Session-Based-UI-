package com.acme.authservice.controller;

import com.acme.authservice.model.Credentials;
import com.acme.authservice.security.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LoginController {

    private final TokenService tokenService;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    public LoginController(TokenService tokenService, UserDetailsService userDetailsService, PasswordEncoder passwordEncoder){
        this.tokenService = tokenService;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody Credentials credentials){

        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(credentials.getUsername());

            if (!passwordEncoder.matches(credentials.getPassword(), userDetails.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }

            String authority = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .findFirst()
                    .orElse("ROLE_USER");
            String role = authority.replace("ROLE_", "");

            String token = tokenService.generateToken(credentials.getUsername(), role);
            return ResponseEntity.ok(new AuthResponse(token, credentials.getUsername(), role));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @GetMapping("/secret")
    public ResponseEntity<String> secret(){
        return ResponseEntity.ok("Secret content accessed");
    }

    public record AuthResponse(String token, String username, String role) {
    }
}
