import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './css/CourseList.css';


function CourseList() {
    const [courses, setCourses] = useState([]);

    // Fetch the list of courses from the backend API
    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await axios.get('http://localhost:3001/courses');
                setCourses(response.data);
                console.log('Fetched courses:', response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, []);

    // Handle course deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/courses/${id}`);
            // Update course list after deletion
            setCourses(courses.filter(course => course._id !== id));
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
    
        <div className="course-list-container">
            <center>
            <h1>List of Courses</h1>
            <Link to="/new-course">
    <button className="add-course-button">Add New Course</button>
</Link>
</center>

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
                                <a href={course.introVideo} target="_blank" rel="noopener noreferrer">
                                    Watch
                                </a>
                            </td>
                            <td>{course.fee}</td>
                            <td>
                                <Link to={`/edit-course/${course._id}`}>
                                    <button>Edit</button>
                                </Link>
                                <button onClick={() => handleDelete(course._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CourseList;
