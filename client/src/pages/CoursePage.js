/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CoursePage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        // Fetch course details from backend
        fetch(`http://localhost:5050/courses/${id}`)
            .then((response) => response.json())
            .then((data) => setCourse(data))
            .catch((error) => console.error('Error fetching course:', error));
    }, [id]);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{course.name}</h1>
            <p>{course.description}</p>
            <p>Duration: {course.duration} weeks</p>
            
            <Link to={`/edit/${course.id}`}>Edit Course</Link>
        </div>
    );
}

export default CoursePage;
