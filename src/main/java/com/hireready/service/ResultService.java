package com.hireready.service;

import com.hireready.dto.QuestionAnswerDTO;
import com.hireready.dto.QuizResultDTO;
import com.hireready.dto.QuizSubmissionDTO;
import com.hireready.entity.Assessment;
import com.hireready.entity.Question;
import com.hireready.repository.AssessmentRepository;
import com.hireready.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ResultService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private AIService aiService;

    public QuizResultDTO processQuiz(QuizSubmissionDTO submission) {
        int correctAnswers = 0;
        int totalQuestions = submission.getAnswers() != null ? submission.getAnswers().size() : 0;
        
        java.util.List<String> wrongQuestions = new java.util.ArrayList<>();
        
        if (totalQuestions > 0) {
            for (QuestionAnswerDTO answerDTO : submission.getAnswers()) {
                Question question = questionRepository.findById(answerDTO.getQuestionId()).orElse(null);
                if (question != null && question.getCorrectOption() != null) {
                    if (question.getCorrectOption().equals(answerDTO.getSelectedOption())) {
                        correctAnswers++;
                    } else {
                        wrongQuestions.add(question.getContent());
                    }
                }
            }
        }
        
        double percentage = totalQuestions > 0 ? ((double) correctAnswers / totalQuestions) * 100 : 0.0;
        percentage = Math.round(percentage * 100.0) / 100.0;
        
        String feedback;
        if (percentage >= 90) {
            feedback = "Excellent performance! You are well prepared.";
        } else if (percentage >= 75) {
            feedback = "Good job! A little more practice and you'll be perfect.";
        } else if (percentage >= 50) {
            feedback = "Fair attempt. You need to review the core concepts.";
        } else {
            feedback = "Poor performance. Significant study and practice is required.";
        }
        
        String aiFeedback = aiService.generateFeedback(percentage, wrongQuestions);
        
        if (submission.getUserId() != null) {
            Assessment assessment = new Assessment();
            assessment.setUserId(submission.getUserId());
            assessment.setSubject(submission.getSubject());
            assessment.setTotalScore(percentage);
            assessment.setAiFeedback(aiFeedback);
            assessment.setTimestamp(LocalDateTime.now());
            assessmentRepository.save(assessment);
        }
        
        return new QuizResultDTO(totalQuestions, correctAnswers, percentage, feedback, aiFeedback);
    }
}
