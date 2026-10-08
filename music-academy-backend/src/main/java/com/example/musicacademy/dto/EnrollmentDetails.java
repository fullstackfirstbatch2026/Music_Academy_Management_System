package com.example.musicacademy.dto;

import java.time.LocalDate;

public class EnrollmentDetails {

    private Long enrollmentId;
    private String studentName;
    private String studentEmail;
    private String courseName;
    private String instructorName;
    private String specialization;
    private LocalDate enrollmentDate;

    public EnrollmentDetails(
            Long enrollmentId,
            String studentName,
            String studentEmail,
            String courseName,
            String instructorName,
            String specialization,
            LocalDate enrollmentDate) {

        this.enrollmentId = enrollmentId;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.courseName = courseName;
        this.instructorName = instructorName;
        this.specialization = specialization;
        this.enrollmentDate = enrollmentDate;
    }

    public Long getEnrollmentId() {
        return enrollmentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public String getCourseName() {
        return courseName;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public String getSpecialization() {
        return specialization;
    }

    public LocalDate getEnrollmentDate() {
        return enrollmentDate;
    }
}