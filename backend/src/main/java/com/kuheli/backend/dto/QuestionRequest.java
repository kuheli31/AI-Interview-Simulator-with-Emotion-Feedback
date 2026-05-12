package com.kuheli.backend.dto;

public record QuestionRequest(
        String role,
        String difficulty,
        int count
) {}