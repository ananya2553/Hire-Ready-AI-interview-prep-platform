package com.hireready.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizResultDTO {
    private int totalQuestions;
    private int correctAnswers;
    private double percentage;
    private String performanceFeedback;
    private String aiFeedback;
}
