package com.hireready.controller;

import com.hireready.dto.QuizSubmissionDTO;
import com.hireready.service.ResultService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class SecurityIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ResultService resultService;


    @Test
    public void testOsQuestionsFailsWith401WithoutToken() throws Exception {
        mockMvc.perform(get("/api/os/questions"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testResultServiceCalculatesZeroPercent() throws Exception {
        QuizSubmissionDTO ms = new QuizSubmissionDTO();
        ms.setUserId(1L);
        ms.setSubject("OS");
        ms.setAnswers(Collections.emptyList());

        var result = resultService.processQuiz(ms);
        assert result.getPercentage() == 0.0;
        assert result.getCorrectAnswers() == 0;
        assert result.getTotalQuestions() == 0;
    }
}
