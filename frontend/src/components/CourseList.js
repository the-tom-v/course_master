import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CourseList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await axios.get('http://localhost:3001/courses');
                setCourses(response.data);

                // Print fetched data in the console
                console.log('Fetched courses:', response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, []);

    // Rendering of courses goes here
    return (
        <div>
            <h1>List of Courses</h1>
            <ul>
                {courses.map(course => (
                    <li key={course._id}>
                        <div><strong>Name:</strong> {course.name}</div>
                        <div><strong>Description:</strong> {course.description}</div>
                        <div><strong>Duration:</strong> {course.duration} months</div>
                        <div><strong>Introductory Video:</strong> <a href={course.introVideo} target="_blank" rel="noreferrer">Watch</a></div>
                        <div><strong>Fee:</strong> ${course.fee}</div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseList;
