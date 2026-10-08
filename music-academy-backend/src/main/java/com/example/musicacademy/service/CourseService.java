package com.example.musicacademy.service;

import java.util.List;
import com.example.musicacademy.repository.CourseEnrollmentProjection;
import org.springframework.stereotype.Service;

import com.example.musicacademy.entity.Course;
import com.example.musicacademy.repository.CourseRepository;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    public List<CourseEnrollmentProjection> getCoursesAboveAverage() {
        return courseRepository.findCoursesAboveAverage();
    }

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }
}