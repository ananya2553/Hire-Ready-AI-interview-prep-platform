package com.hireready.dto;

import lombok.Data;
import java.util.List;

@Data
public class QuizSubmissionDTO {
    private Long userId;
    private String subject; // OS/DBMS/CN
    private List<QuestionAnswerDTO> answers;
}
