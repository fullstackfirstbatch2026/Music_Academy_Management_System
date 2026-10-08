package com.example.musicacademy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.musicacademy.entity.Instructor;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {

}