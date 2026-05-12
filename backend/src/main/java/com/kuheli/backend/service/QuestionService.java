package com.kuheli.backend.service;

import com.kuheli.backend.dto.QuestionRequest;
import com.kuheli.backend.dto.QuestionResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {

    public QuestionResponse generateQuestions(QuestionRequest request) {
        List<String> allQuestions = getQuestionsByRole(request.role());

        int count = Math.min(request.count(), allQuestions.size());

        List<String> selected = new ArrayList<>(
                allQuestions.subList(0, count)
        );

        return new QuestionResponse(selected);
    }
    private List<String> getQuestionsByRole(String role) {
        return switch (role.toLowerCase()) {
            case "software engineer" -> List.of(
                    "Tell me about yourself.",
                    "What is polymorphism in OOP?",
                    "Explain REST APIs.",
                    "What is JWT authentication?",
                    "Difference between ArrayList and LinkedList.",
                    "What is multithreading?",
                    "Explain database normalization.",
                    "What is dependency injection?"
            );

            case "frontend developer" -> List.of(
                    "What is React?",
                    "Difference between props and state.",
                    "What are hooks?",
                    "What is useEffect used for?",
                    "Explain virtual DOM.",
                    "Difference between localStorage and sessionStorage."
            );

            case "data scientist" -> List.of(
                    "What is overfitting?",
                    "Difference between supervised and unsupervised learning.",
                    "What is cross-validation?",
                    "Explain precision and recall.",
                    "What is feature engineering?"
            );

            default -> List.of(
                    "Tell me about yourself.",
                    "Why do you want this role?",
                    "What are your strengths?",
                    "What are your weaknesses?",
                    "Where do you see yourself in 5 years?"
            );
        };
    }
}