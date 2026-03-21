package com.hireready.controller;

import com.hireready.dto.UserProfileDTO;
import com.hireready.entity.Assessment;
import com.hireready.repository.AssessmentRepository;
import com.hireready.repository.BookmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.OptionalDouble;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable Long userId) {
        List<Assessment> assessments = assessmentRepository.findByUserId(userId);
        
        int totalQuizzes = assessments.size();
        
        double avgOs = computeAverage(assessments, "OS");
        double avgDbms = computeAverage(assessments, "DBMS");
        double avgCn = computeAverage(assessments, "CN");

        int solvedDsa = bookmarkRepository.findByUserId(userId).size();

        UserProfileDTO profile = new UserProfileDTO();
        profile.setUserId(userId);
        profile.setTotalQuizzesTaken(totalQuizzes);
        profile.setAvgOsScore(Math.round(avgOs * 100.0) / 100.0);
        profile.setAvgDbmsScore(Math.round(avgDbms * 100.0) / 100.0);
        profile.setAvgCnScore(Math.round(avgCn * 100.0) / 100.0);
        profile.setSolvedDsaCount(solvedDsa);

        return ResponseEntity.ok(profile);
    }

    private double computeAverage(List<Assessment> assessments, String subject) {
        OptionalDouble avg = assessments.stream()
                .filter(a -> subject.equalsIgnoreCase(a.getSubject()))
                .mapToDouble(Assessment::getTotalScore)
                .average();
        return avg.isPresent() ? avg.getAsDouble() : 0.0;
    }
}
