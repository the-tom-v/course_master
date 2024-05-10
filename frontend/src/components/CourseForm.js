/** 
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

*/

import React, { useState } from 'react';
import axios from 'axios';
import './css/CourseForm.css';

function CourseForm({ course = {}, onSave }) {
    // Initialize state variables for form fields
    const [name, setName] = useState(course.name || '');
    const [description, setDescription] = useState(course.description || '');
    const [duration, setDuration] = useState(course.duration || '');
    const [introVideo, setIntroVideo] = useState(course.introVideo || '');
    const [fee, setFee] = useState(course.fee || '');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCourse = {
            name,
            description,
            duration,
            introVideo,
            fee,
        };
        try {
            if (course._id) {
                // Update existing course
                await axios.put(`http://localhost:3001/courses/${course._id}`, newCourse);
            } else {
                // Create new course
                await axios.post('http://localhost:3001/courses', newCourse);
            }
            onSave(); // Call onSave function after saving course
        } catch (error) {
            console.error('Error saving course:', error);
        }
    };

    // Render the form
    return (
        <form onSubmit={handleSubmit} className="course-form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="duration">Duration (months):</label>
                <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="introVideo">Introductory Video URL:</label>
                <input
                    type="url"
                    id="introVideo"
                    value={introVideo}
                    onChange={(e) => setIntroVideo(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="fee">Fee:</label>
                <input
                    type="number"
                    id="fee"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn-save">Create Course</button>
        </form>
    );
}

export default CourseForm;

