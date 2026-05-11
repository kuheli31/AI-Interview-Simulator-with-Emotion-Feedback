package com.kuheli.backend.dto;

public record LoginRequest(
        String email,
        String password
) {}