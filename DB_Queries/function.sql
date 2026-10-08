DELIMITER //

CREATE FUNCTION count_student_courses(
    p_student_id BIGINT
)
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE course_count INT;

    SELECT COUNT(DISTINCT course_id)
    INTO course_count
    FROM class_enrollments
    WHERE student_id = p_student_id;

    RETURN course_count;
END //

DELIMITER ;


SELECT count_student_courses(1) AS total_courses;
SELECT count_student_courses(2) AS total_courses;
SELECT count_student_courses(3) AS total_courses;