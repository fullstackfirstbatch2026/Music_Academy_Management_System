DELIMITER //

CREATE PROCEDURE enroll_student(
    IN p_student_id BIGINT,
    IN p_course_id BIGINT,
    IN p_instructor_id BIGINT
)
BEGIN
    INSERT INTO class_enrollments
        (student_id, course_id, instructor_id)
    VALUES
        (p_student_id, p_course_id, p_instructor_id);
END //

DELIMITER ;

CALL enroll_student(1, 1, 1);