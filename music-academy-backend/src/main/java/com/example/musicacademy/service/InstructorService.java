package com.example.musicacademy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.musicacademy.entity.Instructor;
import com.example.musicacademy.repository.InstructorRepository;

@Service
public class InstructorService {

    private final InstructorRepository instructorRepository;

    public InstructorService(InstructorRepository instructorRepository) {
        this.instructorRepository = instructorRepository;
    }

    public List<Instructor> getAllInstructors() {
        return instructorRepository.findAll();
    }

    public Instructor saveInstructor(Instructor instructor) {
        return instructorRepository.save(instructor);
    }
}