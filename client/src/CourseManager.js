import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CourseManager() {
    const [courses, setCourses] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [video, setVideo] = useState('');
    const [fee, setFee] = useState('');

    // Fetch courses from the server
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5050/courses');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Add a new course to the server
    const handleAddCourse = async (e) => {
        e.preventDefault();
        
        const newCourse = { name, description, duration, video, fee };
        try {
            await axios.post('http://localhost:5050', newCourse);
            fetchCourses(); // Refresh the list of courses
            // Clear the form fields
            setName('');
            setDescription('');
            setDuration('');
            setVideo('');
            setFee('');
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <div>
            <h1>Course Manager</h1>

            {/* Form to add a new course */}
            <form onSubmit={handleAddCourse}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Duration:
                        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Video:
                        <input type="text" value={video} onChange={(e) => setVideo(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Fee:
                        <input type="text" value={fee} onChange={(e) => setFee(e.target.value)} required />
                    </label>
                </div>
                <button type="submit">Add Course</button>
            </form>

            {/* Display the list of courses */}
            <h2>Courses</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        <strong>{course.name}</strong> - {course.description} ({course.duration} hours) 
                        <br />
                        Video: {course.video}
                        <br />
                        Fee: {course.fee}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseManager;
