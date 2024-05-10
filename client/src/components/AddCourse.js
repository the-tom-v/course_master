import React, { useState } from 'react';

const AddCourse = () => {
    // Define state variables for the form inputs
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [video, setVideo] = useState('');
    const [fee, setFee] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the course object
        const newCourse = {
            name,
            description,
            duration,
            video,
            fee,
        };

        try {
            // Send a POST request to the backend API
            const response = await fetch('http://localhost:5050', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCourse),
            });

            // Check if the request was successful
            if (response.ok) {
                // Course added successfully
                alert('Course added successfully!');
                // Clear the form inputs
                setName('');
                setDescription('');
                setDuration('');
                setVideo('');
                setFee('');
            } else {
                // Handle the error response
                const data = await response.json();
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    // Render the form for adding a new course
    return (
        <div>
            <h2>Add New Course</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="duration">Course Duration:</label>
                    <input
                        type="number"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="video">Introductory Video:</label>
                    <input
                        type="text"
                        id="video"
                        value={video}
                        onChange={(e) => setVideo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fee">Course Fee:</label>
                    <input
                        type="number"
                        id="fee"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default AddCourse;
