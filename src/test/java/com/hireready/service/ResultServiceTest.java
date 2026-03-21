package com.hireready.service;

import com.hireready.dto.QuestionAnswerDTO;
import com.hireready.dto.QuizResultDTO;
import com.hireready.dto.QuizSubmissionDTO;
import com.hireready.entity.Assessment;
import com.hireready.entity.Question;
import com.hireready.repository.AssessmentRepository;
import com.hireready.repository.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ResultServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private AssessmentRepository assessmentRepository;

    @InjectMocks
    private ResultService resultService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testProcessQuiz_ZeroAnswers() {
        QuizSubmissionDTO submission = new QuizSubmissionDTO();
        submission.setUserId(1L);
        submission.setSubject("OS");
        submission.setAnswers(new ArrayList<>()); // 0 answers

        when(assessmentRepository.save(any(Assessment.class))).thenAnswer(invocation -> {
            Assessment arg = invocation.getArgument(0);
            arg.setId(100L);
            return arg;
        });

        QuizResultDTO result = resultService.processQuiz(submission);
        
        assertNotNull(result);
        assertEquals(0.0, result.getPercentage());
        assertEquals(0, result.getCorrectAnswers());
        assertEquals("Poor performance. Significant study and practice is required.", result.getPerformanceFeedback());
        
        verify(questionRepository, never()).findById(anyLong());
        verify(assessmentRepository, times(1)).save(any(Assessment.class));
    }

    @Test
    public void testProcessQuiz_AllCorrect() {
        QuizSubmissionDTO submission = new QuizSubmissionDTO();
        submission.setUserId(1L);
        submission.setSubject("DBMS");
        
        QuestionAnswerDTO ans1 = new QuestionAnswerDTO();
        ans1.setQuestionId(1L);
        ans1.setSelectedOption("A");
        
        QuestionAnswerDTO ans2 = new QuestionAnswerDTO();
        ans2.setQuestionId(2L);
        ans2.setSelectedOption("B");
        
        submission.setAnswers(Arrays.asList(ans1, ans2));

        Question q1 = new Question();
        q1.setId(1L);
        q1.setCorrectOption("A");

        Question q2 = new Question();
        q2.setId(2L);
        q2.setCorrectOption("B");

        when(questionRepository.findById(1L)).thenReturn(Optional.of(q1));
        when(questionRepository.findById(2L)).thenReturn(Optional.of(q2));

        when(assessmentRepository.save(any(Assessment.class))).thenAnswer(invocation -> {
            Assessment arg = invocation.getArgument(0);
            arg.setId(101L);
            return arg;
        });

        QuizResultDTO result = resultService.processQuiz(submission);
        
        assertNotNull(result);
        assertEquals(100.0, result.getPercentage()); // 2 out of 2 is 100%
        assertEquals(2, result.getCorrectAnswers());
        assertEquals("Excellent performance! You are well prepared.", result.getPerformanceFeedback());
        
        verify(questionRepository, times(2)).findById(anyLong());
        verify(assessmentRepository, times(1)).save(any(Assessment.class));
    }
}
