package com.hireready.controller;

import com.hireready.entity.Bookmark;
import com.hireready.repository.BookmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addBookmark(@RequestParam Long userId, @RequestParam Long problemId) {
        if (bookmarkRepository.existsByUserIdAndDsaProblemId(userId, problemId)) {
            return ResponseEntity.badRequest().body("Bookmark already exists.");
        }
        
        Bookmark bookmark = new Bookmark();
        bookmark.setUserId(userId);
        bookmark.setDsaProblemId(problemId);
        bookmarkRepository.save(bookmark);
        
        return ResponseEntity.ok("Problem bookmarked successfully.");
    }

    @DeleteMapping("/remove")
    @Transactional
    public ResponseEntity<?> removeBookmark(@RequestParam Long userId, @RequestParam Long problemId) {
        if (!bookmarkRepository.existsByUserIdAndDsaProblemId(userId, problemId)) {
            return ResponseEntity.badRequest().body("Bookmark does not exist.");
        }
        
        bookmarkRepository.deleteByUserIdAndDsaProblemId(userId, problemId);
        return ResponseEntity.ok("Bookmark removed successfully.");
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Bookmark>> getUserBookmarks(@PathVariable Long userId) {
        return ResponseEntity.ok(bookmarkRepository.findByUserId(userId));
    }
}
