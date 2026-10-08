package com.example.musicacademy.repository;

public interface CourseEnrollmentProjection {

    Long getCourseId();

    String getCourseName();

    Integer getEnrolledCount();
}