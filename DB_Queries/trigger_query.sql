DELIMITER //

CREATE TRIGGER after_enrollment_insert
AFTER INSERT ON class_enrollments
FOR EACH ROW
BEGIN
    UPDATE courses
    SET enrolled_count = enrolled_count + 1
    WHERE course_id = NEW.course_id;
END //

DELIMITER ;
