package com.hireready.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestTemplate;
import org.springframework.boot.web.client.RestTemplateBuilder;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

public class AIServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private RestTemplateBuilder builder;

    private AIService aiService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        when(builder.build()).thenReturn(restTemplate);
        aiService = new AIService(builder);
    }

    @Test
    public void testGenerateFeedback_HighScore_ShouldReturnStrengthsJSON() {
        List<String> wrong = Arrays.asList();
        String feedback = aiService.generateFeedback(95.0, wrong);
        
        assertTrue(feedback.contains("strengths"));
        assertTrue(feedback.contains("improvements"));
        assertTrue(feedback.contains("Excellent"));
    }

    @Test
    public void testGenerateFeedback_LowScore_ShouldReturnImprovementJSON() {
        List<String> wrong = Arrays.asList("What is OS?", "What is Thrashing?");
        String feedback = aiService.generateFeedback(40.0, wrong);
        
        assertTrue(feedback.contains("strengths"));
        assertTrue(feedback.contains("improvements"));
        assertTrue(feedback.contains("Significant revision"));
    }
}
