package com.acme.authservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/user/profile")
    public ResponseEntity<Map<String, String>> userProfile() {
        return ResponseEntity.ok(Map.of(
                "message", "User profile accessed",
                "scope", "USER"
        ));
    }

    @GetMapping("/admin/dashboard")
    public ResponseEntity<Map<String, String>> adminDashboard() {
        return ResponseEntity.ok(Map.of(
                "message", "Admin dashboard accessed",
                "scope", "ADMIN"
        ));
    }
}
