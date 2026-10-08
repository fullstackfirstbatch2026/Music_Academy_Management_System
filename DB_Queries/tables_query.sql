CREATE TABLE students (
    student_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20)
);
CREATE TABLE instructors (
    instructor_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    instructor_name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL
);
CREATE TABLE courses (
    course_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL,
    course_level VARCHAR(50),
    capacity INT NOT NULL,
    enrolled_count INT NOT NULL DEFAULT 0
);
CREATE TABLE class_enrollments (
    enrollment_id BIGINT PRIMARY KEY AUTO_INCREMENT,

    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    instructor_id BIGINT NOT NULL,

    enrollment_date DATE NOT NULL DEFAULT (CURRENT_DATE),

    CONSTRAINT fk_enrollment_student
        FOREIGN KEY (student_id)
        REFERENCES students(student_id),

    CONSTRAINT fk_enrollment_course
        FOREIGN KEY (course_id)
        REFERENCES courses(course_id),

    CONSTRAINT fk_enrollment_instructor
        FOREIGN KEY (instructor_id)
        REFERENCES instructors(instructor_id)
);