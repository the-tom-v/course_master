const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5050;

// Middleware to parse request body as JSON
app.use(bodyParser.json());

// Example data structure to store course information
let courses = [
    {
        id: 1,
        name: 'Create API',
        desc: 'Learn how to create APIs',
        duration: '3 weeks',
        video: '<YouTube video link>',
        fee: 'Free'
    },
    {
        id: 2,
        name: 'Test with Postman',
        desc: 'Learn how to test APIs with Postman',
        duration: '2 weeks',
        video: '<YouTube video link>',
        fee: '$20'
    }
    // Add more courses as needed
];

// Endpoint to retrieve all courses
app.get('/courses', (req, res) => {
    res.json(courses);
});

// Endpoint to create a new course
app.post('/courses', (req, res) => {
    const newCourse = req.body;
    // Assign an ID to the new course (you can use more sophisticated ID generation)
    newCourse.id = courses.length + 1;
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

// Endpoint to edit a course
app.put('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedCourse = req.body;
    const courseIndex = courses.findIndex(course => course.id === id);

    if (courseIndex !== -1) {
        courses[courseIndex] = { ...courses[courseIndex], ...updatedCourse };
        res.json(courses[courseIndex]);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// Endpoint to delete a course
app.delete('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const courseIndex = courses.findIndex(course => course.id === id);

    if (courseIndex !== -1) {
        courses.splice(courseIndex, 1);
        res.status(204).send(); // No content response
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
