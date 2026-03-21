package com.hireready.service;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AIService {

    private final RestTemplate restTemplate;

    public AIService(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    public String generateFeedback(double score, List<String> wrongQuestions) {
        try {
            // In a real scenario, this would post to OpenAI/Gemini API.
            // String response = restTemplate.postForObject("https://api.openai.com/v1/completions", request, String.class);
            
            // For now, we return a fallback successful JSON response to ensure the build doesn't fail unless explicitly tested.
            return constructDefaultFeedback(score);
        } catch (Exception e) {
            return constructDefaultFeedback(score);
        }
    }

    private String constructDefaultFeedback(double score) {
        if (score >= 90) {
            return "{\"strengths\": \"Excellent foundational knowledge and problem-solving skills.\", \"improvements\": \"Focus on advanced systemic architectures to achieve mastery.\"}";
        } else if (score >= 50) {
            return "{\"strengths\": \"Good grasp of core concepts.\", \"improvements\": \"Review the specific incorrectly answered questions to solidify your understanding.\"}";
        } else {
            return "{\"strengths\": \"Attempted the assessment courageously.\", \"improvements\": \"Significant revision of fundamental topics is required before retaking the test.\"}";
        }
    }
}
