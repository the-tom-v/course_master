import React from 'react';
import CourseForm from '../components/CourseForm';
import { useNavigate } from 'react-router-dom';
import CourseService from '../services/CourseService';

function CreateCoursePage() {
    const navigate = useNavigate(); // Use navigate for navigation

    // Handle form submission for creating a new course
    const handleSubmit = async (courseData) => {
        try {
            // Use CourseService to create the new course
            await CourseService.createCourse(courseData);
            // Redirect to the home page after successful creation
            navigate('/');
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <div>
            <h1>Create New Course</h1>
            <CourseForm onSubmit={handleSubmit} />
        </div>
    );
}

export default CreateCoursePage;
