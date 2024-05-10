import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/CourseForm.css'; // Use the same CSS styles as in CourseForm.js

function EditCourse() {
    const { id } = useParams(); // Get course ID from URL
    const navigate = useNavigate(); // To navigate after editing the course

    // Initialize state variables for form fields
    const [course, setCourse] = useState({
        name: '',
        description: '',
        duration: '',
        introVideo: '',
        fee: ''
    });

    // Fetch course details based on the ID
    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await axios.get(`http://localhost:3001/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        }
        fetchCourse();
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update course
            await axios.put(`http://localhost:3001/courses/${id}`, course);
            navigate('/courses'); // Redirect to the course list page
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    // Render the form
    return (
        <form onSubmit={handleSubmit} className="course-form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={course.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={course.description}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="duration">Duration (months):</label>
                <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={course.duration}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="introVideo">Introductory Video URL:</label>
                <input
                    type="url"
                    id="introVideo"
                    name="introVideo"
                    value={course.introVideo}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="fee">Fee:</label>
                <input
                    type="number"
                    id="fee"
                    name="fee"
                    value={course.fee}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn-save">Update</button>
        </form>
    );
}

export default EditCourse;