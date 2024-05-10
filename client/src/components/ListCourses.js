import React, { useEffect, useState } from 'react';

const ListCourses = () => {
    // Define state variables to store courses data
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch courses data from the backend API
    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:5050');
            if (response.ok) {
                const data = await response.json();
                setCourses(data);
            } else {
                console.error('Failed to fetch courses:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    // Use the useEffect hook to fetch data when the component mounts
    useEffect(() => {
        fetchCourses();
    }, []);

    // Render the courses data in a table
    return (
        <div>
            <h2>List of Courses</h2>
            {loading ? (
                <p>Loading courses...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Video</th>
                            <th>Fee</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={courses._id}>
                                <td>{courses.name}</td>
                                <td>{courses.desc}</td>
                                <td>{courses.duration}</td>
                                <td>{courses.video}</td>
                                <td>{courses.fee}</td>
                                <td>
                                    {/* Add your edit button here */}
                                    <button>Edit</button>
                                </td>
                                <td>
                                    {/* Add your delete button here */}
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListCourses;
