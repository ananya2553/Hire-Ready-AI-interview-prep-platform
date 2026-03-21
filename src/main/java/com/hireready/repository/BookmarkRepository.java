package com.hireready.repository;

import com.hireready.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findByUserId(Long userId);
    boolean existsByUserIdAndDsaProblemId(Long userId, Long dsaProblemId);
    void deleteByUserIdAndDsaProblemId(Long userId, Long dsaProblemId);
}
