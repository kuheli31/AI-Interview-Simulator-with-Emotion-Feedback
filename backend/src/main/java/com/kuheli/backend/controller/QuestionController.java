package com.kuheli.backend.controller;

import com.kuheli.backend.dto.QuestionRequest;
import com.kuheli.backend.dto.QuestionResponse;
import com.kuheli.backend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping("/generate")
    public QuestionResponse generateQuestions(
            @RequestBody QuestionRequest request
    ) {
        return questionService.generateQuestions(request);
    }
}