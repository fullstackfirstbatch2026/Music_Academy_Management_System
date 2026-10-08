package com.example.musicacademy.service;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import com.example.musicacademy.dto.EnrollmentDetails;
import com.example.musicacademy.entity.ClassEnrollment;
import com.example.musicacademy.repository.ClassEnrollmentRepository;

@Service
public class ClassEnrollmentService {

    private final ClassEnrollmentRepository classEnrollmentRepository;
    private final JdbcTemplate jdbcTemplate;

    public ClassEnrollmentService(
            ClassEnrollmentRepository classEnrollmentRepository,
            JdbcTemplate jdbcTemplate) {

        this.classEnrollmentRepository = classEnrollmentRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ClassEnrollment> getAllEnrollments() {
        return classEnrollmentRepository.findAll();
    }
    public List<EnrollmentDetails> getEnrollmentDetails() {
        return classEnrollmentRepository.findEnrollmentDetails();
    }

    public void enrollStudent(Long studentId, Long courseId, Long instructorId) {

        jdbcTemplate.update(
            "CALL enroll_student(?, ?, ?)",
            studentId,
            courseId,
            instructorId
        );
    }
}