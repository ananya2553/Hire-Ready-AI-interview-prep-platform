package com.hireready.dto;

import lombok.Data;

@Data
public class UserProfileDTO {
    private Long userId;
    private int totalQuizzesTaken;
    private double avgOsScore;
    private double avgDbmsScore;
    private double avgCnScore;
    private int solvedDsaCount;
}
