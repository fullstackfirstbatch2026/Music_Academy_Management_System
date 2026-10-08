package com.example.musicacademy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.musicacademy.dto.EnrollmentDetails;
import com.example.musicacademy.entity.ClassEnrollment;

public interface ClassEnrollmentRepository extends JpaRepository<ClassEnrollment, Long> {

    @Query("""
        SELECT new com.example.musicacademy.dto.EnrollmentDetails(
            ce.enrollmentId,
            s.studentName,
            s.email,
            c.courseName,
            i.instructorName,
            i.specialization,
            ce.enrollmentDate
        )
        FROM ClassEnrollment ce
        JOIN Student s ON ce.studentId = s.studentId
        JOIN Course c ON ce.courseId = c.courseId
        JOIN Instructor i ON ce.instructorId = i.instructorId
    """)
    List<EnrollmentDetails> findEnrollmentDetails();

}