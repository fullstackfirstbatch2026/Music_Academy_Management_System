package com.example.musicacademy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.musicacademy.entity.Course;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
public interface CourseRepository extends JpaRepository<Course, Long> {
	@Query(value = """
		    SELECT course_id AS courseId,
		           course_name AS courseName,
		           enrolled_count AS enrolledCount
		    FROM courses
		    WHERE enrolled_count > (
		        SELECT AVG(enrolled_count)
		        FROM courses
		    )
		    """, nativeQuery = true)
		List<CourseEnrollmentProjection> findCoursesAboveAverage();

}