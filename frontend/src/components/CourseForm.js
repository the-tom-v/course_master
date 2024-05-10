import React, { useState } from 'react';
import axios from 'axios';

function CourseForm({ onCourseCreated }) {
    const [course, setCourse] = useState({
        name: '',
        description: '',
        duration: '',
        introVideo: '',
        fee: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the backend API
            const response = await axios.post('http://localhost:3001/courses', course);
            console.log('Course created:', response.data);
            // Callback function to notify the parent component
            onCourseCreated();
            // Reset form fields after successful submission
            setCourse({
                name: '',
                description: '',
                duration: '',
                introVideo: '',
                fee: '',
            });
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={course.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={course.description}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Duration (months):</label>
                <input
                    type="number"
                    name="duration"
                    value={course.duration}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Introductory Video URL:</label>
                <input
                    type="url"
                    name="introVideo"
                    value={course.introVideo}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Fee:</label>
                <input
                    type="number"
                    name="fee"
                    value={course.fee}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Create Course</button>
        </form>
    );
}

export default CourseForm;
