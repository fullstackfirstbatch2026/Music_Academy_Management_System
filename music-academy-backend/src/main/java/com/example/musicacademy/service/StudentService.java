package com.example.musicacademy.service;

import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.musicacademy.entity.Student;
import com.example.musicacademy.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    private final JdbcTemplate jdbcTemplate;

    public StudentService(
            StudentRepository studentRepository,
            JdbcTemplate jdbcTemplate) {

        this.studentRepository = studentRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    public Integer countStudentCourses(Long studentId) {
        return jdbcTemplate.queryForObject(
            "SELECT count_student_courses(?)",
            Integer.class,
            studentId
        );
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }
}