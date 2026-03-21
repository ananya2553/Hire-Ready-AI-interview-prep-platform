package com.hireready.repository;

import com.hireready.entity.Question;
import com.hireready.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findBySubjectType(Subject subjectType);
}
