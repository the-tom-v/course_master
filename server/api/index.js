const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5050;

// Middleware to parse request body as JSON
app.use(bodyParser.json());

// MongoDB connection details
const uri = "mongodb://localhost:27017/courseMaster"; 
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        // Your code to handle successful connection
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
}

connectToDatabase();

let coursesCollection;

// Connect to the database
client.connect()
    .then(() => {
        console.log('Connected to MongoDB');
        
        // Set the courses collection
        const db = client.db('courseMaster'); // Use the database name you set up
        coursesCollection = db.collection('courses');

        // Start the server
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });

// Endpoint to retrieve all courses
app.get('/courses', async (req, res) => {
    try {
        const courses = await coursesCollection.find().toArray();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving courses', error: err.message });
    }
});

// Endpoint to create a new course
app.post('/courses', async (req, res) => {
    try {
        const newCourse = req.body;
        const result = await coursesCollection.insertOne(newCourse);
        res.status(201).json(result.ops[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error creating course', error: err.message });
    }
});

// Endpoint to update a course
app.put('/courses/:id', async (req, res) => {
    const id = req.params.id;
    const updatedCourse = req.body;

    try {
        // Use new keyword when creating ObjectId
        const objectId = new ObjectId(id);
        
        const result = await coursesCollection.findOneAndUpdate(
            { _id: objectId },
            { $set: updatedCourse },
            { returnOriginal: false }
        );

        if (result.value) {
            res.json(result.value);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating course', error: err.message });
    }
});


// Endpoint to delete a course
app.delete('/courses/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await coursesCollection.deleteOne({ _id: ObjectId(id) });

        if (result.deletedCount > 0) {
            res.status(204).send(); // No content response
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting course', error: err.message });
    }
});
