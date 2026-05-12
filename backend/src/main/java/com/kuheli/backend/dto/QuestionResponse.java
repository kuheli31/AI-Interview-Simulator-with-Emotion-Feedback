package com.kuheli.backend.dto;

import java.util.List;

public record QuestionResponse(
        List<String> questions
) {}