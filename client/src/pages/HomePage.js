import React, { useState, useEffect } from 'react';
import CourseList from '../components/CourseList';
import CourseService from '../services/CourseService';

function HomePage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch courses using CourseService
        CourseService.getCourses()
            .then((data) => setCourses(data))
            .catch((error) => console.error('Error fetching courses:', error));
    }, []);

    return (
        <div>
            <h1>Courses</h1>
            <CourseList courses={courses} />
        </div>
    );
}

export default HomePage;
