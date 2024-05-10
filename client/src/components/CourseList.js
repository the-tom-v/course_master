import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CourseList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await axios.get('http://localhost:5050/courses');

                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5050/courses/${id}`);
            setCourses(courses.filter(courses => courses._id !== id));
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <div>
            <h1>List of Courses</h1>
            <Link to="/course/new">
                <button>Add New Course</button>
            </Link>
            <ul>
                {courses.map(courses => (
                    <li key={courses._id}>
                        <div><strong>Name:</strong> {courses.name}</div>
                        <div><strong>Description:</strong> {courses.desc}</div>
                        <div><strong>Duration:</strong> {courses.duration} weeks</div>
                        <div>
                            <strong>Introductory Video:</strong> 
                            <a href={courses.video} target="_blank" rel="noreferrer">Watch</a>
                        </div>
                        <div><strong>Fee:</strong> ${courses.fee}</div>
                        <div>
                            <Link to={`/course/edit/${courses._id}`}>
                                <button>Edit</button>
                            </Link>
                            <button onClick={() => handleDelete(courses._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseList;
