package com.example.musicacademy.controller;

import java.util.List;
import com.example.musicacademy.dto.EnrollmentDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.musicacademy.entity.ClassEnrollment;
import com.example.musicacademy.service.ClassEnrollmentService;

@RestController
@RequestMapping("/api/enrollments")
public class ClassEnrollmentController {

    private final ClassEnrollmentService classEnrollmentService;

    public ClassEnrollmentController(ClassEnrollmentService classEnrollmentService) {
        this.classEnrollmentService = classEnrollmentService;
    }

    @GetMapping
    public List<ClassEnrollment> getAllEnrollments() {
        return classEnrollmentService.getAllEnrollments();
    }
    @GetMapping("/details")
    public List<EnrollmentDetails> getEnrollmentDetails() {
        return classEnrollmentService.getEnrollmentDetails();
    }

    @PostMapping
    public String enrollStudent(
            @RequestParam Long studentId,
            @RequestParam Long courseId,
            @RequestParam Long instructorId) {

        classEnrollmentService.enrollStudent(
                studentId,
                courseId,
                instructorId);

        return "Student enrolled successfully";
    }
}