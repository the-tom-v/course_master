import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './css/CourseList.css';

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
            <table className="responsive-table">
                {/* Table header */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Duration (months)</th>
                        <th>Introductory Video</th>
                        <th>Fee</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Table body */}
                <tbody>
                    {courses.map(course => (
                        <tr key={course._id}>
                            <td>{course.name}</td>
                            <td>{course.description}</td>
                            <td>{course.duration}</td>
                            <td>
                                <a href={course.introVideo} target="_blank" rel="noreferrer">
                                    Watch
                                </a>
                            </td>
                            <td>${course.fee}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CourseList;
