import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseForm from '../components/CourseForm';
import CourseService from '../services/CourseService';

function EditCoursePage() {
    const { id } = useParams(); // Fetch the course ID from the URL
    const navigate = useNavigate(); // Use navigate for navigation
    const [course, setCourse] = useState(null); // State to store the course details

    // Fetch the course details when the component mounts
    useEffect(() => {
        CourseService.getCourseById(id)
            .then((data) => setCourse(data))
            .catch((error) => console.error('Error fetching course:', error));
    }, [id]);

    // Handle form submission for updating the course
    const handleSubmit = async (courseData) => {
        try {
            // Use CourseService to update the course data
            await CourseService.updateCourse(id, courseData);
            // Redirect to the course details page after successful update
            navigate(`/course/${id}`);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    // If the course data is not yet available, show a loading state
    if (!course) {
        return <div>Loading...</div>;
    }

    // Render the form with the course data and the submit handler
    return (
        <div>
            <h1>Edit Course</h1>
            <CourseForm
                course={course}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default EditCoursePage;
