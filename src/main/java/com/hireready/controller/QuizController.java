package com.hireready.controller;

import com.hireready.dto.QuizResultDTO;
import com.hireready.dto.QuizSubmissionDTO;
import com.hireready.dto.StandardResponse;
import com.hireready.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private ResultService resultService;

    @PostMapping("/submit")
    public ResponseEntity<StandardResponse<QuizResultDTO>> submitQuiz(@RequestBody QuizSubmissionDTO submission) {
        QuizResultDTO result = resultService.processQuiz(submission);
        return ResponseEntity.ok(new StandardResponse<>(true, "Quiz submitted successfully", result));
    }
}
