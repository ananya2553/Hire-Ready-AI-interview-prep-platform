package com.hireready.controller;

import com.hireready.dto.QuizResultDTO;
import com.hireready.dto.QuizSubmissionDTO;
import com.hireready.security.JwtUtil;
import com.hireready.security.UserDetailsImpl;
import com.hireready.security.UserDetailsServiceImpl;
import com.hireready.service.ResultService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class QuizControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtUtil jwtUtil;

    @MockBean
    private UserDetailsServiceImpl userDetailsService;

    @MockBean
    private ResultService resultService;

    @Test
    public void testAccessQuizEndpointWithoutToken_ShouldReturnUnauthorized() throws Exception {
        String submissionJson = "{\"userId\": 1, \"subject\": \"OS\", \"answers\": []}";

        mockMvc.perform(post("/api/quiz/submit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(submissionJson))
                .andExpect(status().isUnauthorized()); 
    }

    @Test
    public void testAccessQuizEndpointWithValidToken_ShouldReturnOk() throws Exception {
        String submissionJson = "{\"userId\": 1, \"subject\": \"OS\", \"answers\": []}";
        
        UserDetailsImpl mockUser = new UserDetailsImpl(1L, "test@example.com", "password");
        when(userDetailsService.loadUserByUsername(anyString())).thenReturn(mockUser);
        
        QuizResultDTO mockResult = new QuizResultDTO();
        mockResult.setPercentage(100.0);
        when(resultService.processQuiz(any(QuizSubmissionDTO.class))).thenReturn(mockResult);

        String validToken = jwtUtil.generateToken("test@example.com");

        mockMvc.perform(post("/api/quiz/submit")
                .header("Authorization", "Bearer " + validToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(submissionJson))
                .andExpect(status().isOk()); 
    }
}
