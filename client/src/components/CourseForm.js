import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function CourseForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        name: '',
        desc: '',
        duration: '',
        video: '',
        fee: '',
    });

    // Load course data if editing an existing course
    useEffect(() => {
        if (id) {
            axios.get(`/http://localhost:5050/courses/${id}`)
                .then(response => {
                    setCourse(response.data);
                })
                .catch(error => {
                    console.error('Error fetching course:', error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // Update existing course
                await axios.put(`/http://localhost:5050/courses/${id}`, course);
            } else {
                // Create new course
                await axios.post('/http://localhost:5050/courses', course);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving course:', error);
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
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="desc"
                    value={course.desc}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Duration (months):</label>
                <input
                    type="number"
                    name="duration"
                    value={course.duration}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Introductory Video URL:</label>
                <input
                    type="url"
                    name="introVideo"
                    value={course.video}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Fee:</label>
                <input
                    type="number"
                    name="fee"
                    value={course.fee}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
}

export default CourseForm;
