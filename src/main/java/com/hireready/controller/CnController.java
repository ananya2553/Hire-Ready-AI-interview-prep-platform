package com.hireready.controller;

import com.hireready.dto.StandardResponse;
import com.hireready.entity.Question;
import com.hireready.entity.Subject;
import com.hireready.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cn")
public class CnController {

    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping("/questions")
    public ResponseEntity<StandardResponse<List<Question>>> getCnQuestions() {
        List<Question> data = questionRepository.findBySubjectType(Subject.CN);
        return ResponseEntity.ok(new StandardResponse<>(true, "CN questions fetched successfully", data));
    }
}
