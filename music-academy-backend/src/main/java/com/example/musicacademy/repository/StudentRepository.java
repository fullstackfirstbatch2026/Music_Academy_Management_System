package com.example.musicacademy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.musicacademy.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}