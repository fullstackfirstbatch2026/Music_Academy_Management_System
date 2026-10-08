SELECT
    ce.enrollment_id,
    s.student_name,
    s.email AS student_email,
    c.course_name,
    i.instructor_name,
    i.specialization,
    ce.enrollment_date
FROM class_enrollments ce
JOIN students s
    ON ce.student_id = s.student_id
JOIN courses c
    ON ce.course_id = c.course_id
JOIN instructors i
    ON ce.instructor_id = i.instructor_id;