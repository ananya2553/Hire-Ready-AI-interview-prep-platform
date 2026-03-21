package com.hireready.config;

import com.hireready.entity.User;
import com.hireready.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class TestUserSeeder {

    @Bean
    public CommandLineRunner seedTestUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("test@company.com").isEmpty()) {
                User user = new User();
                user.setEmail("test@company.com");
                user.setName("Test User");
                user.setPassword(passwordEncoder.encode("YourNewPassword123!"));
                userRepository.save(user);
                System.out.println("✅ SUCCESSFULLY SEEDED TEST USER: test@company.com / YourNewPassword123!");
            }
        };
    }
}
