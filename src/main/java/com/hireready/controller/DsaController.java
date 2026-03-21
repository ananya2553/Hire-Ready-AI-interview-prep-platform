package com.hireready.controller;

import com.hireready.dto.StandardResponse;
import com.hireready.entity.DsaProblem;
import com.hireready.repository.DsaProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dsa")
public class DsaController {

    @Autowired
    private DsaProblemRepository dsaProblemRepository;

    @GetMapping("/problems")
    public ResponseEntity<StandardResponse<List<DsaProblem>>> getAllProblems() {
        List<DsaProblem> data = dsaProblemRepository.findAll();
        return ResponseEntity.ok(new StandardResponse<>(true, "DSA problems fetched successfully", data));
    }

    @GetMapping("/problems/difficulty/{difficulty}")
    public ResponseEntity<StandardResponse<List<DsaProblem>>> getProblemsByDifficulty(@PathVariable String difficulty) {
        List<DsaProblem> data = dsaProblemRepository.findByDifficulty(difficulty);
        return ResponseEntity.ok(new StandardResponse<>(true, "DSA problems fetched successfully", data));
    }
}
