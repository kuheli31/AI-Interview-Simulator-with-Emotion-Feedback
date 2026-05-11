package com.kuheli.backend.dto;

public record AuthResponse(
        String token,
        String message
) {}