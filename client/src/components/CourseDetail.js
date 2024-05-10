import React from 'react';

function CourseDetail({ course }) {
    return (
        <div>
            <h1>{course.name}</h1>
            <p>{course.description}</p>
            <p>Duration: {course.duration} weeks</p>
        </div>
    );
}

export default CourseDetail;
