import React from 'react';
import CourseForm from '../components/CourseForm';

function CourseFormPage({ history }) {
    const handleCourseCreated = () => {
        history.push('/'); // Redirect to course list page after course creation
    };

    return (
        <div>
            <h2>Create a New Course</h2>
            <CourseForm onCourseCreated={handleCourseCreated} />
        </div>
    );
}

export default CourseFormPage;
