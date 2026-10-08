import { useEffect, useState } from 'react'
import './App.css'
import Login from './Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')

  const [students, setStudents] = useState([])
  const [instructors, setInstructors] = useState([])
  const [courses, setCourses] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [aboveAverageCourses, setAboveAverageCourses] = useState([])

  const [selectedStudent, setSelectedStudent] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedInstructor, setSelectedInstructor] = useState('')

  const [message, setMessage] = useState('')

  const [studentName, setStudentName] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [studentPhone, setStudentPhone] = useState('')
  const [studentMessage, setStudentMessage] = useState('')

  const [instructorName, setInstructorName] = useState('')
  const [instructorSpecialization, setInstructorSpecialization] =
    useState('')
  const [instructorEmail, setInstructorEmail] = useState('')
  const [instructorMessage, setInstructorMessage] = useState('')

  const [courseName, setCourseName] = useState('')
  const [courseLevel, setCourseLevel] = useState('')
  const [courseCapacity, setCourseCapacity] = useState('')
  const [courseMessage, setCourseMessage] = useState('')

  /* Function output */
  const [courseCount, setCourseCount] = useState(null)
  const [courseCountStudent, setCourseCountStudent] = useState(null)
  const [courseCountLoading, setCourseCountLoading] = useState(false)
  const [courseCountMessage, setCourseCountMessage] = useState('')

  useEffect(() => {
    if (isLoggedIn) {
      loadAllData()
    }
  }, [isLoggedIn])

  const loadAllData = async () => {
    await Promise.all([
      loadStudents(),
      loadInstructors(),
      loadCourses(),
      loadEnrollments(),
      loadAboveAverageCourses(),
    ])
  }

  const loadStudents = async () => {
    try {
      const response = await fetch('/api/students')

      if (!response.ok) {
        throw new Error('Failed to load students')
      }

      const data = await response.json()
      setStudents(data)
    } catch (error) {
      console.error(error)
    }
  }

  const loadInstructors = async () => {
    try {
      const response = await fetch('/api/instructors')

      if (!response.ok) {
        throw new Error('Failed to load instructors')
      }

      const data = await response.json()
      setInstructors(data)
    } catch (error) {
      console.error(error)
    }
  }

  const loadCourses = async () => {
    try {
      const response = await fetch('/api/courses')

      if (!response.ok) {
        throw new Error('Failed to load courses')
      }

      const data = await response.json()
      setCourses(data)
    } catch (error) {
      console.error(error)
    }
  }

  const loadEnrollments = async () => {
    try {
      const response = await fetch('/api/enrollments/details')

      if (!response.ok) {
        throw new Error('Failed to load enrollments')
      }

      const data = await response.json()
      setEnrollments(data)
    } catch (error) {
      console.error(error)
    }
  }

  const loadAboveAverageCourses = async () => {
    try {
      const response = await fetch('/api/courses/above-average')

      if (!response.ok) {
        throw new Error('Failed to load above average courses')
      }

      const data = await response.json()
      setAboveAverageCourses(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActivePage('dashboard')
  }

  const navigate = (page) => {
    setActivePage(page)
    setMessage('')
    setStudentMessage('')
    setInstructorMessage('')
    setCourseMessage('')
    setCourseCountMessage('')
  }

  const handleEnroll = async (event) => {
    event.preventDefault()

    if (!selectedStudent || !selectedCourse || !selectedInstructor) {
      setMessage('Please select student, course and instructor.')
      return
    }

    try {
      const response = await fetch(
        `/api/enrollments?studentId=${selectedStudent}&courseId=${selectedCourse}&instructorId=${selectedInstructor}`,
        {
          method: 'POST',
        }
      )

      if (!response.ok) {
        throw new Error('Enrollment failed')
      }

      const data = await response.text()

      setMessage(data || 'Student enrolled successfully.')

      setSelectedStudent('')
      setSelectedCourse('')
      setSelectedInstructor('')

      await loadAllData()
    } catch (error) {
      console.error(error)
      setMessage('Unable to enroll student. Please try again.')
    }
  }

  const handleAddStudent = async (event) => {
    event.preventDefault()

    if (!studentName || !studentEmail || !studentPhone) {
      setStudentMessage('Please fill in all student fields.')
      return
    }

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName,
          email: studentEmail,
          phone: studentPhone,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add student')
      }

      setStudentMessage('Student added successfully.')

      setStudentName('')
      setStudentEmail('')
      setStudentPhone('')

      await loadStudents()
    } catch (error) {
      console.error(error)
      setStudentMessage(
        'Unable to add student. Please check the details.'
      )
    }
  }

  const handleAddInstructor = async (event) => {
    event.preventDefault()

    if (
      !instructorName ||
      !instructorSpecialization ||
      !instructorEmail
    ) {
      setInstructorMessage('Please fill in all instructor fields.')
      return
    }

    try {
      const response = await fetch('/api/instructors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instructorName,
          specialization: instructorSpecialization,
          email: instructorEmail,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add instructor')
      }

      setInstructorMessage('Instructor added successfully.')

      setInstructorName('')
      setInstructorSpecialization('')
      setInstructorEmail('')

      await loadInstructors()
    } catch (error) {
      console.error(error)
      setInstructorMessage(
        'Unable to add instructor. Please check the details.'
      )
    }
  }

  const handleAddCourse = async (event) => {
    event.preventDefault()

    if (!courseName || !courseLevel || !courseCapacity) {
      setCourseMessage('Please fill in all course fields.')
      return
    }

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseName,
          courseLevel,
          capacity: Number(courseCapacity),
          enrolledCount: 0,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add course')
      }

      setCourseMessage('Course added successfully.')

      setCourseName('')
      setCourseLevel('')
      setCourseCapacity('')

      await loadCourses()
      await loadAboveAverageCourses()
    } catch (error) {
      console.error(error)
      setCourseMessage(
        'Unable to add course. Please check the details.'
      )
    }
  }

  const handleCourseCount = async () => {
    if (!selectedStudent) {
      setCourseCountMessage('Please select a student.')
      setCourseCount(null)
      setCourseCountStudent(null)
      return
    }

    setCourseCountLoading(true)
    setCourseCountMessage('')
    setCourseCount(null)
    setCourseCountStudent(null)

    try {
      const response = await fetch(
        `/api/students/${selectedStudent}/course-count`
      )

      if (!response.ok) {
        throw new Error('Failed to get course count')
      }

      const data = await response.json()

      const student = students.find(
        (item) =>
          String(item.studentId) === String(selectedStudent)
      )

      setCourseCount(data)
      setCourseCountStudent(student)
    } catch (error) {
      console.error(error)
      setCourseCountMessage(
        'Unable to get course count. Please try again.'
      )
    } finally {
      setCourseCountLoading(false)
    }
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  const currentPageTitle = {
    dashboard: 'Dashboard',
    students: 'Students',
    instructors: 'Instructors',
    courses: 'Courses',
    enrollments: 'Enrollments',
    reports: 'Reports',
  }

  return (
    <div className="app">

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside className="sidebar">

        <div className="sidebar-brand">
          <div className="sidebar-logo">♫</div>

          <div className="sidebar-brand-text">
            <h2>Music Academy</h2>
            <p>Management System</p>
          </div>
        </div>

        <div className="sidebar-menu">

          <p className="menu-label">MAIN MENU</p>

          <button
            className={`nav-item ${
              activePage === 'dashboard' ? 'active' : ''
            }`}
            onClick={() => navigate('dashboard')}
          >
            <span className="nav-icon">⌂</span>
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-item ${
              activePage === 'students' ? 'active' : ''
            }`}
            onClick={() => navigate('students')}
          >
            <span className="nav-icon">♙</span>
            <span>Students</span>
          </button>

          <button
            className={`nav-item ${
              activePage === 'instructors' ? 'active' : ''
            }`}
            onClick={() => navigate('instructors')}
          >
            <span className="nav-icon">♟</span>
            <span>Instructors</span>
          </button>

          <button
            className={`nav-item ${
              activePage === 'courses' ? 'active' : ''
            }`}
            onClick={() => navigate('courses')}
          >
            <span className="nav-icon">♫</span>
            <span>Courses</span>
          </button>

          <button
            className={`nav-item ${
              activePage === 'enrollments' ? 'active' : ''
            }`}
            onClick={() => navigate('enrollments')}
          >
            <span className="nav-icon">✓</span>
            <span>Enrollments</span>
          </button>

          <p className="menu-label menu-label-report">
            REPORTS
          </p>

          <button
            className={`nav-item ${
              activePage === 'reports' ? 'active' : ''
            }`}
            onClick={() => navigate('reports')}
          >
            <span className="nav-icon">▤</span>
            <span>Reports</span>
          </button>

        </div>

        <div className="sidebar-bottom">

          <div className="admin-box">
            <div className="admin-avatar">A</div>

            <div className="admin-info">
              <strong>Administrator</strong>
              <span>admin@musicacademy.com</span>
            </div>
          </div>

          <button
            className="sidebar-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN AREA
          ===================================================== */}

      <main className="main-area">

        {/* TOP HEADER */}

        <header className="top-header">

          <div className="header-title">
            <h1>{currentPageTitle[activePage]}</h1>
            <p>
              Music Academy Management System
            </p>
          </div>

          <div className="header-profile">

            <div className="header-profile-info">
              <strong>Administrator</strong>
              <span>Academy Admin</span>
            </div>

            <div className="header-avatar">
              A
            </div>

          </div>

        </header>


        {/* PAGE CONTENT */}

        <div className="content">

          {/* =================================================
              DASHBOARD
              ================================================= */}

          {activePage === 'dashboard' && (
            <div className="page-content">

              <section className="welcome-banner">

                <div className="welcome-note">
                  <h2>Welcome to Music Academy</h2>

                  <p>
                    Manage students, instructors, courses and
                    class enrollments from one centralized
                    management system.
                  </p>

                  <small>
                    Academic Management Dashboard
                  </small>
                </div>

                <div className="welcome-icon">
                  ♫
                </div>

              </section>


              {/* STATISTICS */}

              <section className="stats-grid">

                <div className="stat-card">
                  <div className="stat-icon">
                    ♙
                  </div>

                  <div>
                    <h3>Total Students</h3>
                    <strong>{students.length}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    ♟
                  </div>

                  <div>
                    <h3>Total Instructors</h3>
                    <strong>{instructors.length}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    ♫
                  </div>

                  <div>
                    <h3>Total Courses</h3>
                    <strong>{courses.length}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    ✓
                  </div>

                  <div>
                    <h3>Total Enrollments</h3>
                    <strong>{enrollments.length}</strong>
                  </div>
                </div>

              </section>


              {/* DASHBOARD TWO COLUMN */}

              <section className="dashboard-columns">

                {/* COURSE STATUS */}

                <div className="panel">

                  <div className="panel-header">
                    <div>
                      <h3>Course Enrollment Status</h3>
                      <p>
                        Current enrollment against capacity
                      </p>
                    </div>
                  </div>

                  <div className="dashboard-course-list">

                    {courses.length === 0 ? (
                      <div className="empty-state">
                        No courses available.
                      </div>
                    ) : (
                      courses.map((course) => {

                        const capacity =
                          Number(course.capacity) || 0

                        const enrolled =
                          Number(course.enrolledCount) || 0

                        const percentage =
                          capacity > 0
                            ? Math.min(
                                (enrolled / capacity) * 100,
                                100
                              )
                            : 0

                        return (
                          <div
                            className="dashboard-course"
                            key={course.courseId}
                          >

                            <div className="course-row">

                              <div>
                                <strong>
                                  {course.courseName}
                                </strong>

                                <span>
                                  {course.courseLevel || 'Course'}
                                </span>
                              </div>

                              <span className="course-count">
                                {enrolled} / {capacity}
                              </span>

                            </div>

                            <div className="mini-progress">
                              <div
                                className="mini-progress-bar"
                                style={{
                                  width: `${percentage}%`,
                                }}
                              />
                            </div>

                          </div>
                        )
                      })
                    )}

                  </div>

                </div>


                {/* RECENT ENROLLMENTS */}

                <div className="panel">

                  <div className="panel-header">
                    <div>
                      <h3>Recent Enrollments</h3>
                      <p>
                        Latest student registrations
                      </p>
                    </div>
                  </div>

                  <div className="recent-list">

                    {enrollments.length === 0 ? (
                      <div className="empty-state">
                        No enrollments available.
                      </div>
                    ) : (
                      enrollments
                        .slice()
                        .reverse()
                        .slice(0, 5)
                        .map((enrollment, index) => (
                          <div
                            className="recent-item"
                            key={
                              enrollment.enrollmentId ||
                              index
                            }
                          >

                            <div className="recent-avatar">
                              {enrollment.studentName
                                ? enrollment.studentName
                                    .charAt(0)
                                    .toUpperCase()
                                : 'S'}
                            </div>

                            <div className="recent-info">

                              <strong>
                                {enrollment.studentName}
                              </strong>

                              <span>
                                {enrollment.courseName}
                              </span>

                            </div>

                            <span className="recent-date">
                              {enrollment.enrollmentDate ||
                                '-'}
                            </span>

                          </div>
                        ))
                    )}

                  </div>

                </div>

              </section>


              {/* ABOVE AVERAGE */}

              <section className="panel average-section">

                <div className="panel-header">

                  <div>
                    <h3>
                      Courses Above Average Enrollment
                    </h3>

                    <p>
                      Courses having enrollment above
                      the overall average
                    </p>
                  </div>

                </div>

                <div className="average-grid">

                  {aboveAverageCourses.length === 0 ? (
                    <div className="empty-state">
                      No course is currently above the
                      average enrollment.
                    </div>
                  ) : (
                    aboveAverageCourses.map((course) => (
                      <div
                        className="average-card"
                        key={course.courseId}
                      >

                        <div className="average-icon">
                          ♫
                        </div>

                        <div>
                          <strong>
                            {course.courseName}
                          </strong>

                          <span>
                            {course.enrolledCount}{' '}
                            enrolled students
                          </span>
                        </div>

                      </div>
                    ))
                  )}

                </div>

              </section>

            </div>
          )}


          {/* =================================================
              STUDENTS
              ================================================= */}

          {activePage === 'students' && (
            <div className="page-content">

              <div className="page-title">
                <h2>Students</h2>
                <p>
                  Manage student information and records.
                </p>
              </div>

              <section className="form-panel">

                <div className="section-heading">
                  <div>
                    <h3>Add New Student</h3>
                    <p>
                      Enter student details to create a
                      new record.
                    </p>
                  </div>
                </div>

                <form
                  className="professional-form"
                  onSubmit={handleAddStudent}
                >

                  <div className="form-group">
                    <label>Student Name</label>

                    <input
                      type="text"
                      placeholder="Enter student name"
                      value={studentName}
                      onChange={(e) =>
                        setStudentName(e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>

                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={studentEmail}
                      onChange={(e) =>
                        setStudentEmail(e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>

                    <input
                      type="text"
                      placeholder="Enter phone number"
                      value={studentPhone}
                      onChange={(e) =>
                        setStudentPhone(e.target.value)
                      }
                    />
                  </div>

                  <div className="form-action">
                    <button
                      type="submit"
                      className="form-button"
                    >
                      Add Student
                    </button>
                  </div>

                </form>

                {studentMessage && (
                  <div className="success-message">
                    {studentMessage}
                  </div>
                )}

              </section>


              <section className="page-panel-inner">

                <div className="table-heading">
                  <div>
                    <h3>Student Records</h3>
                    <p>
                      All registered students
                    </p>
                  </div>

                  <span className="table-count">
                    {students.length} Students
                  </span>
                </div>

                <div className="table-wrapper">

                  <table>

                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                      </tr>
                    </thead>

                    <tbody>

                      {students.length === 0 ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="table-empty"
                          >
                            No students found.
                          </td>
                        </tr>
                      ) : (
                        students.map((student) => (
                          <tr key={student.studentId}>

                            <td>
                              #{student.studentId}
                            </td>

                            <td>
                              <div className="person-cell">
                                <div className="person-avatar">
                                  {student.studentName
                                    ?.charAt(0)
                                    .toUpperCase()}
                                </div>

                                <strong>
                                  {student.studentName}
                                </strong>
                              </div>
                            </td>

                            <td>{student.email}</td>

                            <td>
                              {student.phone || '-'}
                            </td>

                          </tr>
                        ))
                      )}

                    </tbody>

                  </table>

                </div>

              </section>

            </div>
          )}


          {/* =================================================
              INSTRUCTORS
              ================================================= */}

          {activePage === 'instructors' && (
            <div className="page-content">

              <div className="page-title">
                <h2>Instructors</h2>
                <p>
                  Manage instructors and their
                  specializations.
                </p>
              </div>

              <section className="form-panel">

                <div className="section-heading">
                  <div>
                    <h3>Add New Instructor</h3>
                    <p>
                      Enter instructor information below.
                    </p>
                  </div>
                </div>

                <form
                  className="professional-form"
                  onSubmit={handleAddInstructor}
                >

                  <div className="form-group">
                    <label>Instructor Name</label>

                    <input
                      type="text"
                      placeholder="Enter instructor name"
                      value={instructorName}
                      onChange={(e) =>
                        setInstructorName(e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Specialization</label>

                    <input
                      type="text"
                      placeholder="e.g. Piano, Guitar, Vocal"
                      value={instructorSpecialization}
                      onChange={(e) =>
                        setInstructorSpecialization(
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>

                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={instructorEmail}
                      onChange={(e) =>
                        setInstructorEmail(e.target.value)
                      }
                    />
                  </div>

                  <div className="form-action">
                    <button
                      type="submit"
                      className="form-button"
                    >
                      Add Instructor
                    </button>
                  </div>

                </form>

                {instructorMessage && (
                  <div className="success-message">
                    {instructorMessage}
                  </div>
                )}

              </section>


              <section className="page-panel-inner">

                <div className="table-heading">
                  <div>
                    <h3>Instructor Records</h3>
                    <p>
                      All academy instructors
                    </p>
                  </div>

                  <span className="table-count">
                    {instructors.length} Instructors
                  </span>
                </div>

                <div className="table-wrapper">

                  <table>

                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Instructor</th>
                        <th>Specialization</th>
                        <th>Email</th>
                      </tr>
                    </thead>

                    <tbody>

                      {instructors.length === 0 ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="table-empty"
                          >
                            No instructors found.
                          </td>
                        </tr>
                      ) : (
                        instructors.map((instructor) => (
                          <tr
                            key={instructor.instructorId}
                          >

                            <td>
                              #{instructor.instructorId}
                            </td>

                            <td>
                              <div className="person-cell">
                                <div className="person-avatar">
                                  {instructor.instructorName
                                    ?.charAt(0)
                                    .toUpperCase()}
                                </div>

                                <strong>
                                  {instructor.instructorName}
                                </strong>
                              </div>
                            </td>

                            <td>
                              <span className="badge">
                                {instructor.specialization ||
                                  '-'}
                              </span>
                            </td>

                            <td>
                              {instructor.email}
                            </td>

                          </tr>
                        ))
                      )}

                    </tbody>

                  </table>

                </div>

              </section>

            </div>
          )}


          {/* =================================================
              COURSES
              ================================================= */}

          {activePage === 'courses' && (
            <div className="page-content">

              <div className="page-title">
                <h2>Courses</h2>
                <p>
                  Manage music courses, levels and
                  enrollment capacity.
                </p>
              </div>

              <section className="form-panel">

                <div className="section-heading">
                  <div>
                    <h3>Add New Course</h3>
                    <p>
                      Create a new music course.
                    </p>
                  </div>
                </div>

                <form
                  className="professional-form"
                  onSubmit={handleAddCourse}
                >

                  <div className="form-group">
                    <label>Course Name</label>

                    <input
                      type="text"
                      placeholder="Enter course name"
                      value={courseName}
                      onChange={(e) =>
                        setCourseName(e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Course Level</label>

                    <select
                      value={courseLevel}
                      onChange={(e) =>
                        setCourseLevel(e.target.value)
                      }
                    >
                      <option value="">
                        Select level
                      </option>

                      <option value="Beginner">
                        Beginner
                      </option>

                      <option value="Intermediate">
                        Intermediate
                      </option>

                      <option value="Advanced">
                        Advanced
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Capacity</label>

                    <input
                      type="number"
                      min="1"
                      placeholder="Enter capacity"
                      value={courseCapacity}
                      onChange={(e) =>
                        setCourseCapacity(e.target.value)
                      }
                    />
                  </div>

                  <div className="form-action">
                    <button
                      type="submit"
                      className="form-button"
                    >
                      Add Course
                    </button>
                  </div>

                </form>

                {courseMessage && (
                  <div className="success-message">
                    {courseMessage}
                  </div>
                )}

              </section>


              <section className="course-grid">

                {courses.length === 0 ? (
                  <div className="page-panel-inner">
                    <div className="empty-state">
                      No courses available.
                    </div>
                  </div>
                ) : (
                  courses.map((course) => {

                    const capacity =
                      Number(course.capacity) || 0

                    const enrolled =
                      Number(course.enrolledCount) || 0

                    const percentage =
                      capacity > 0
                        ? Math.min(
                            (enrolled / capacity) * 100,
                            100
                          )
                        : 0

                    return (
                      <div
                        className="course-card"
                        key={course.courseId}
                      >

                        <div className="course-card-top">
                          <div className="course-card-icon">
                            ♫
                          </div>

                          <span className="badge">
                            {course.courseLevel}
                          </span>
                        </div>

                        <h3>{course.courseName}</h3>

                        <p>
                          Music course offered by
                          Music Academy.
                        </p>

                        <div className="course-card-progress">

                          <div className="progress-label">
                            <span>
                              Enrollment
                            </span>

                            <strong>
                              {enrolled} / {capacity}
                            </strong>
                          </div>

                          <div className="mini-progress">
                            <div
                              className="mini-progress-bar"
                              style={{
                                width: `${percentage}%`,
                              }}
                            />
                          </div>

                        </div>

                        <div className="course-card-meta">

                          <div>
                            <span>Capacity</span>
                            <strong>{capacity}</strong>
                          </div>

                          <div>
                            <span>Enrolled</span>
                            <strong>{enrolled}</strong>
                          </div>

                        </div>

                      </div>
                    )
                  })
                )}

              </section>

            </div>
          )}


          {/* =================================================
              ENROLLMENTS
              ================================================= */}

          {activePage === 'enrollments' && (
            <div className="page-content">

              <div className="page-title">
                <h2>Enrollments</h2>
                <p>
                  Enroll students into available music
                  courses.
                </p>
              </div>

              <section className="form-panel">

                <div className="section-heading">
                  <div>
                    <h3>Enroll Student</h3>
                    <p>
                      Select a student, course and
                      instructor.
                    </p>
                  </div>
                </div>

                <form
                  className="enrollment-form"
                  onSubmit={handleEnroll}
                >

                  <div className="form-group">
                    <label>Student</label>

                    <select
                      value={selectedStudent}
                      onChange={(e) =>
                        setSelectedStudent(
                          e.target.value
                        )
                      }
                    >
                      <option value="">
                        Select student
                      </option>

                      {students.map((student) => (
                        <option
                          key={student.studentId}
                          value={student.studentId}
                        >
                          {student.studentName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Course</label>

                    <select
                      value={selectedCourse}
                      onChange={(e) =>
                        setSelectedCourse(
                          e.target.value
                        )
                      }
                    >
                      <option value="">
                        Select course
                      </option>

                      {courses.map((course) => (
                        <option
                          key={course.courseId}
                          value={course.courseId}
                        >
                          {course.courseName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Instructor</label>

                    <select
                      value={selectedInstructor}
                      onChange={(e) =>
                        setSelectedInstructor(
                          e.target.value
                        )
                      }
                    >
                      <option value="">
                        Select instructor
                      </option>

                      {instructors.map((instructor) => (
                        <option
                          key={
                            instructor.instructorId
                          }
                          value={
                            instructor.instructorId
                          }
                        >
                          {instructor.instructorName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-action">
                    <button
                      type="submit"
                      className="form-button"
                    >
                      Enroll Student
                    </button>
                  </div>

                </form>

                {message && (
                  <div className="success-message">
                    {message}
                  </div>
                )}

              </section>


              {/* ENROLLMENT DETAILS */}

              <section className="page-panel-inner">

                <div className="table-heading">

                  <div>
                    <h3>Enrollment Details</h3>

                    <p>
                      Student, course and instructor
                      information
                    </p>
                  </div>

                  <span className="table-count">
                    {enrollments.length} Enrollments
                  </span>

                </div>

                <div className="table-wrapper">

                  <table>

                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Student</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Instructor</th>
                        <th>Specialization</th>
                        <th>Date</th>
                      </tr>
                    </thead>

                    <tbody>

                      {enrollments.length === 0 ? (
                        <tr>
                          <td
                            colSpan="7"
                            className="table-empty"
                          >
                            No enrollments found.
                          </td>
                        </tr>
                      ) : (
                        enrollments.map((enrollment) => (
                          <tr
                            key={
                              enrollment.enrollmentId
                            }
                          >

                            <td>
                              #{enrollment.enrollmentId}
                            </td>

                            <td>
                              <strong>
                                {enrollment.studentName}
                              </strong>
                            </td>

                            <td>
                              {enrollment.studentEmail}
                            </td>

                            <td>
                              <span className="badge">
                                {enrollment.courseName}
                              </span>
                            </td>

                            <td>
                              {enrollment.instructorName}
                            </td>

                            <td>
                              {enrollment.specialization ||
                                '-'}
                            </td>

                            <td>
                              {enrollment.enrollmentDate ||
                                '-'}
                            </td>

                          </tr>
                        ))
                      )}

                    </tbody>

                  </table>

                </div>

              </section>

            </div>
          )}


          {/* =================================================
              REPORTS
              ================================================= */}

          {activePage === 'reports' && (
            <div className="page-content">

              <div className="page-title">
                <h2>Reports</h2>
                <p>
                  Database-driven reports and analytics.
                </p>
              </div>


              {/* REPORT SUMMARY */}

              <section className="report-grid">

                <div className="report-card">

                  <div className="report-card-header">
                    <div className="report-card-icon">
                      ♙
                    </div>

                    <div>
                      <h3>Students</h3>
                      <p>
                        Total registered students
                      </p>
                    </div>
                  </div>

                  <div className="report-value">
                    {students.length}
                  </div>

                  <div className="report-label">
                    Registered students
                  </div>

                </div>


                <div className="report-card">

                  <div className="report-card-header">
                    <div className="report-card-icon">
                      ♫
                    </div>

                    <div>
                      <h3>Courses</h3>
                      <p>
                        Available academy courses
                      </p>
                    </div>
                  </div>

                  <div className="report-value">
                    {courses.length}
                  </div>

                  <div className="report-label">
                    Available courses
                  </div>

                </div>

              </section>


              {/* ABOVE AVERAGE REPORT */}

              <section className="page-panel-inner report-section">

                <div className="table-heading">

                  <div>
                    <h3>
                      Above-Average Enrollment
                    </h3>

                    <p>
                      Courses whose enrollment is
                      above the average enrollment
                    </p>
                  </div>

                </div>

                <div className="table-wrapper">

                  <table>

                    <thead>
                      <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Enrolled Students</th>
                      </tr>
                    </thead>

                    <tbody>

                      {aboveAverageCourses.length === 0 ? (
                        <tr>
                          <td
                            colSpan="3"
                            className="table-empty"
                          >
                            No courses are above average.
                          </td>
                        </tr>
                      ) : (
                        aboveAverageCourses.map(
                          (course) => (
                            <tr
                              key={course.courseId}
                            >
                              <td>
                                #{course.courseId}
                              </td>

                              <td>
                                <strong>
                                  {course.courseName}
                                </strong>
                              </td>

                              <td>
                                <span className="badge">
                                  {
                                    course.enrolledCount
                                  }{' '}
                                  students
                                </span>
                              </td>
                            </tr>
                          )
                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </section>


              {/* FUNCTION OUTPUT */}

              <section className="page-panel-inner course-count-panel">

                <div className="table-heading">

                  <div>
                    <h3>Student Course Count</h3>

                    <p>
                      Count courses for a student using
                      the MySQL function.
                    </p>
                  </div>

                </div>


                <div className="course-count-body">

                  <div className="course-count-form">

                    <div className="form-group">
                      <label>Select Student</label>

                      <select
                        value={selectedStudent}
                        onChange={(e) => {
                          setSelectedStudent(
                            e.target.value
                          )
                          setCourseCount(null)
                          setCourseCountStudent(null)
                          setCourseCountMessage('')
                        }}
                      >
                        <option value="">
                          Select a student
                        </option>

                        {students.map((student) => (
                          <option
                            key={student.studentId}
                            value={student.studentId}
                          >
                            {student.studentName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-action">
                      <button
                        className="form-button"
                        type="button"
                        onClick={handleCourseCount}
                        disabled={courseCountLoading}
                      >
                        {courseCountLoading
                          ? 'Checking...'
                          : 'Check Course Count'}
                      </button>
                    </div>

                  </div>


                  {courseCountMessage && (
                    <div className="error-message">
                      {courseCountMessage}
                    </div>
                  )}


                  {courseCount !== null &&
                    courseCountStudent && (
                      <div className="course-count-result">

                        <div className="course-count-icon">
                          ♫
                        </div>

                        <div className="course-count-info">
                          <span>Student</span>

                          <strong>
                            {
                              courseCountStudent.studentName
                            }
                          </strong>
                        </div>

                        <div className="course-count-divider" />

                        <div className="course-count-value">
                          <span>
                            Enrolled Courses
                          </span>

                          <strong>
                            {courseCount}
                          </strong>
                        </div>

                      </div>
                    )}

                </div>

              </section>

            </div>
          )}

        </div>


        {/* FOOTER */}

        <footer className="main-footer">
          <strong>Music Academy</strong>
          <span> • </span>
          Music Academy Management System
        </footer>

      </main>

    </div>
  )
}

export default App